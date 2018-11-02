const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
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

// Instructs Passport how to authenticate a user using a locally saved email
// and password combination.  This strategy is called whenever a user attempts to
// log in.  We first find the user model in MongoDB that matches the submitted email,
// then check to see if the provided password matches the saved password. There
// are two obvious failure points here: the email might not exist in our DB or
// the password might not match the saved one.  In either case, we call the 'done'
// callback, including a string that messages why the authentication process failed.
// This string is provided back to the GraphQL client.
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) { return done(err) }
    if (!user) { return done(null, false, 'Invalid Credentials') }
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err) }
      if (isMatch) {
        return done(null, user)
      }
      return done(null, false, 'Invalid credentials.')
    })
  })
}))

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
                email: user.email,
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

// Logs in a user.  This will invoke the 'local-strategy' defined above in this
// file. Notice the strange method signature here: the 'passport.authenticate'
// function returns a function, as its indended to be used as a middleware with
// Express.  We have another compatibility layer here to make it work nicely with
// GraphQL, as GraphQL always expects to see a promise for handling async code.
function login({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) { reject('Invalid credentials.') }

      req.login(user, () => resolve(user))
    })({ body: { email, password } })
  })
}

module.exports = { signup, login }
