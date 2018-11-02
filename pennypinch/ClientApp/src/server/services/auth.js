const mongoose = require('mongoose')
const passport = require('passport')
const { GreenlitUserSchema } = require('../models/greenlitApiUser')
const GreenlitRestClient = require('./restClients/greenlit')

const GreenlitApiUser = mongoose.model('greenlitApiUser', GreenlitUserSchema)

// SerializeUser is used to provide some identifying token that can be saved
// in the users session.  We traditionally use the 'ID' for this.
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// The counterpart of 'serializeUser'.  Given only a user's ID, we must return
// the user object.  This object is placed on 'req.user'.
passport.deserializeUser((id, done) => {
  // We can't utilize the `findById` method since the Greenlit API returns a GUID type, which is
  // out of range of the allowed limitations of the ObjectId conversion
  GreenlitApiUser.findOne({ id }, (err, user) => {
    done(err, user)
  })
})

// Calls the Greenlit API to create a User account. A successful created account from Greenlit
//  will create an ApiUser in GraphQL/MongoDB locally
function signup({ email, password, firstName, lastName, req }) {
  return GreenlitRestClient.register({ email, password, firstName, lastName, req })
    .then(() => {
      // TODO handle errors as collection
      if (!email || !password) { throw new Error('You must provide an email and password.') }

      return GreenlitApiUser.findOne({ email })
        .then(existingUser => {
          if (existingUser) { throw new Error('Email in use') }
        })
        .then(() => {
          return GreenlitRestClient.authenticate({ email, password, req })
            .then(user => {
              const apiUser = new GreenlitApiUser({
                id: user.id,
                email: user.emailAddress,
                authToken: user.authToken
              })

              apiUser.save()

              return new Promise((resolve, reject) => {
                req.login(apiUser, (err) => {
                  if (err) { reject(err) }
                  resolve(apiUser)
                })
              })
            })
        })
      })
  }

// Logs in a user through the Greenlit API.
function login({ email, password, req }) {
  return GreenlitRestClient.authenticate({ email, password, req })
    .then((greenlitUser) => {
      let authenticatedUser = {
        id: greenlitUser.id,
        email,
        authToken: greenlitUser.auth_token
      }

      return new Promise((resolve, reject) => {
        req.login(authenticatedUser, (err) => {
          if (err) { reject(err) }
          resolve(authenticatedUser)
        })
      })
    })
}

module.exports = { signup, login }
