const mongoose = require('mongoose')
const passport = require('passport')
const { UserSchema } = require('../models/user')
const User = mongoose.model('user', UserSchema)
const { UserProfileSchema } = require('../models/userProfile')
const UserProfile = mongoose.model('userProfile', UserProfileSchema)
const { AuthTokenSchema } = require('../models/authToken')
const AuthToken = mongoose.model('authToken', AuthTokenSchema)
const GreenlitRestClient = require('./restClients/greenlit')
const ScrimpRestClient = require('./restClients/scrimp')

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
  User.findOne({ id }, (err, user) => {
    done(err, user)
  })
})

// Calls the Greenlit API to create a User account. A successful created account from Greenlit
//  will create a User in GraphQL/MongoDB locally, and then create the AuthToken for the Greenlit API
function signup({ email, password, firstName, lastName, req }) {
  return GreenlitRestClient.register({ email, password, firstName, lastName, req })
    .then(() => {
      // TODO handle errors as collection
      if (!email || !password) { throw new Error('You must provide an email and password.') }

      return User.findOne({ email })
        .then(existingUser => {
          if (existingUser) { throw new Error('Email in use') }
        })
        .then(() => {
          return GreenlitRestClient.authenticate({ email, password, req })
            .then(authResponse => {
              const { id, authToken, expiresIn, issuedAt } = authResponse
              const apiUser = new User({ id, email, firstName, lastName })
              const greenlitAuthToken = new AuthToken({ userId: id, apiId: id, authToken, expiresIn, issuedAt })

              apiUser.save()
              greenlitAuthToken.save()

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
        email
      }

      let id = authenticatedUser.id

      return AuthToken.findOne({ apiId: id })
        .then((userToken) => {
          if (!userToken) { throw new Error('User is unauthorized. Please sign up.') }

          // update the Greenlit user's auth token with the fresh authenticated auth token
          userToken.authToken = greenlitUser.authToken
          userToken.expiresIn = greenlitUser.expiresIn
          userToken.issuedAt = greenlitUser.issuedAt
          userToken.save()

          return UserProfile.findOne({ greenlitApiId: id })
            .then((userProfile) => {
              const apiId = userProfile.greenlitApiId
              const authToken = userToken.authToken

              return ScrimpRestClient.authenticate({ apiId, authToken })
                .then(scrimpUser => {
                  const scrimpApiId = scrimpUser.id

                  // if there is no user token, don't worry, as the user will be directed to the dashboard-setup
                  return AuthToken.findOne({ apiId: scrimpApiId })
                    .then((userToken) => {
                      // update the Scrimp user's auth token with the fresh authenticated auth token
                      userToken.authToken = scrimpUser.authToken
                      userToken.expiresIn = scrimpUser.expiresIn
                      userToken.issuedAt = scrimpUser.issuedAt
                      userToken.save()

                      return new Promise((resolve, reject) => {
                        req.login(authenticatedUser, (err) => {
                          if (err) { reject(err) }
                          resolve(authenticatedUser)
                        })
                      })
                    })
                })
            })
        })
    })
}

module.exports = { signup, login }
