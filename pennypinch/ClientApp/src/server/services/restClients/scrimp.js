const axios = require('axios')
const mongoose = require('mongoose')
const { UserProfileSchema } = require('../../models/userProfile')
const UserProfile = mongoose.model('userProfile', UserProfileSchema)
const { GreenlitAuthTokenSchema } = require('../../models/greenlitAuthToken')
const { ScrimpAuthTokenSchema } = require('../../models/scrimpAuthToken')
const GreenlitAuthToken = mongoose.model('greenlitAuthToken', GreenlitAuthTokenSchema)
const ScrimpAuthToken = mongoose.model('scrimpAuthToken', ScrimpAuthTokenSchema)

// TODO get url from config
const baseURL = 'http://localhost:4000/api'

function setupUser({ greenlitUser, timezone, weekstart, currency, req }) {
  const greenlitAuthTokenId = req.user.id

  const payload = {
    firstName: greenlitUser.firstName,
    lastName: greenlitUser.lastName,
    emailAddress: greenlitUser.emailAddress,
    authToken: getGreenlitAuthToken(greenlitAuthTokenId),
    greenlitApiId: greenlitUser.id,
    weekStartDay: weekstart,
    currencyCode: currency,
    timezone
  }

  return setup(payload, req)
    .then((response) => {
      const { greenlitApiId } = payload.greenlitApiId
      return UserProfile.findOne({ greenlitApiId })
        .then(existingProfile => {
          if (existingProfile) { throw new Error('User profile has already been setup') }
        })
        .then(() => {
          // construct a 
          const userProfile = new UserProfile({
            timezone: payload.timezone,
            weekstart: payload.weekStartDay,
            currency: payload.currencyCode,
            greenlitApiId: req.user.id,
            scrimpApiId: response.user.id
          })

          const { id, authToken, expiresIn, issuedAt } = response.jwt

          const scrimpAuthToken = new ScrimpAuthToken({ id, authToken, expiresIn, issuedAt })

          userProfile.save()
          scrimpAuthToken.save()
        })
    }).catch((err) => {
      reject(err)
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

function getGreenlitAuthToken(id) {
  return GreenlitAuthToken.findOne({ id })
    .then((found) => {
      console.log(found.authToken)
      return found.authToken
    }).catch(ex => {
      throw new Error(ex)
    })
}

function getScrimpAuthToken(id) {
  return ScrimpAuthToken.findOne(id)
    .then((found) => {
      console.log(found.authToken)
      return found.authToken
    }).catch(ex => {
      throw new Error(ex)
    })
}

function getAuthorizeHeader() {
  // TODO figure out how to pull scrimp auth token id from mongo user profile
  return { 'Authorization': `Bearer ${getScrimpAuthToken()}` }
}

module.exports = { setupUser }
