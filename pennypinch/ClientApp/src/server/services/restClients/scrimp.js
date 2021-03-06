const axios = require('axios')
const mongoose = require('mongoose')
const { UserProfileSchema } = require('../../models/userProfile')
const UserProfile = mongoose.model('userProfile', UserProfileSchema)
const { AuthTokenSchema } = require('../../models/authToken')
const AuthToken = mongoose.model('authToken', AuthTokenSchema)
const GreenlitRestClient = require('./greenlit')

const isProd = process.env.NODE_ENV === 'production'

// TODO get url from config
const baseURL = isProd ? 'http://scrimpapi/api' : 'http://localhost:4000/api'

function authenticate({ apiId, authToken }) {
  return new Promise((resolve, reject) => {
    axios.post(`${baseURL}/users/authenticate`, { apiId, authToken })
      .then(response => {
        resolve(response.data)
      }).catch((ex) => {
        reject(ex)
      })
  })
}

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
          const userid = req.user.id
          return UserProfile.findOne({ greenlitApiId: userid })
            .then(existingProfile => {
              if (existingProfile) { throw new Error('User profile has already been setup') }
            })
            .then(() => {
              const userProfile = new UserProfile({
                timezone: payload.timezone,
                weekstart: payload.weekStartDay,
                currency: payload.currencyCode,
                greenlitApiId: userid,
                scrimpApiId: response.user.id
              })

              const { id, authToken, expiresIn, issuedAt } = response.jwt

              const scrimpAuthToken = new AuthToken({ userId: userid, apiId: id, authToken, expiresIn, issuedAt })

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

function updateUserProfile({ timezone, weekstart, currency, scrimpApiId, req }) {
  return getAuthorizationHeader(scrimpApiId)
    .then((authHeader) => {
      const payload = { timezone, weekStartDay: weekstart, currencyCode: currency }

      return update(scrimpApiId, payload, authHeader, req)
        .then(() => {
          UserProfile.findOne({ scrimpApiId }, (err, doc) => {
            doc.timezone = timezone
            doc.weekstart = weekstart
            doc.currency = currency
            doc.save()
          })
        })
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

function update(id, payload, authHeader, req) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'patch',
      url: `${baseURL}/users/${id}`,
      transformRequest: [function (data, headers) {
        let payload = []

        Object.entries(data).forEach(([key, val]) => {
          payload.push({
            op: "replace",
            path: `/${key}`,
            value: val
          })
        })

        return JSON.stringify(payload)
      }],
      data: payload,
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json'
      }
    }).then(response => {
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
        const header = `Bearer ${authToken}`
        resolve(header)
      }).catch(ex => {
        reject(ex)
      })
  })
}

module.exports = { authenticate, setupUser, updateUserProfile, getAuthToken }
