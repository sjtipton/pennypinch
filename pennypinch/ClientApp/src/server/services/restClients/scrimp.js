const axios = require('axios')
const mongoose = require('mongoose')
const { UserProfileSchema } = require('../../models/userProfile')
const UserProfile = mongoose.model('userProfile', UserProfileSchema)
const { AuthTokenSchema } = require('../../models/authToken')
const AuthToken = mongoose.model('authToken', AuthTokenSchema)
const GreenlitRestClient = require('./greenlit')

// TODO get url from config
const baseURL = 'http://localhost:4000/api'

function setupUser({ greenlitUser, timezone, weekstart, currency, req }) {
  const greenlitAuthTokenId = req.user.id

  return GreenlitRestClient.getAuthToken(greenlitAuthTokenId)
    .then((authToken) => {
      const payload = {
        firstName: greenlitUser.firstName,
        lastName: greenlitUser.lastName,
        emailAddress: greenlitUser.emailAddress,
        authToken: authToken,
        greenlitApiId: greenlitUser.id,
        weekStartDay: weekstart,
        currencyCode: currency,
        timezone
      }

      return setup(payload, req)
        .then((response) => {
          const userid = payload.greenlitApiId
          return UserProfile.findOne({ userid })
            .then(existingProfile => {
              if (existingProfile) { throw new Error('User profile has already been setup') }
            })
            .then(() => {
              const userProfile = new UserProfile({
                timezone: payload.timezone,
                weekstart: payload.weekStartDay,
                currency: payload.currencyCode,
                userid: payload.greenlitApiId,
                scrimpApiId: response.user.id
              })

              const { id, authToken, expiresIn, issuedAt } = response.jwt

              const scrimpAuthToken = new AuthToken({ apiId: id, authToken, expiresIn, issuedAt })

              userProfile.save()
              scrimpAuthToken.save()
            })
        }).catch((err) => {
          throw new Error(err)
        })
    }).catch(ex => {
      throw new Error(ex)
    })
}

function setup(payload, req) {
  return new Promise((resolve, reject) => {
    axios.post(`${baseURL}/users/setup`, payload)
      .then(response => {
        resolve(response.data)
      }).catch((ex) => {
        reject(ex)
      })
  })
}

function getAuthToken(apiId) {
  return new Promise((resolve, reject) => {
    return AuthToken.findOne({ apiId })
      .then((found) => {
        resolve(found.authToken)
      }).catch(ex => {
        reject(ex)
      })
  })
}

// this service will have functions that will call Scrimp API endpoints dependent on a Scrimp JWT authToken
// those functions will need to receive an apiId as an argument... they'd be called from mutations.js
// in this scope, it should be off the level of the UserProfileType, and may be available in parentValue,
// or should be injected in args
function getAuthorizationHeader(apiId) {
  return new Promise((resolve, reject) => {
    return getAuthToken(apiId)
      .then((authToken) => {
        const header = { 'Authorization': `Bearer ${authToken}` }
        resolve(header)
      }).catch(ex => {
        reject(ex)
      })
  })
}

module.exports = { setupUser, getAuthToken }
