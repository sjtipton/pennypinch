const axios = require('axios')
const mongoose = require('mongoose')
const { UserProfileSchema } = require('../../models/userProfile')
const UserProfile = mongoose.model('userProfile', UserProfileSchema)

// TODO get url from config
const baseURL = 'http://localhost:4000/api'

function setupUser({ greenlitUser, timezone, weekstart, currency, req }) {
  const payload = {
    firstName: greenlitUser.firstName,
    lastName: greenlitUser.lastName,
    emailAddress: greenlitUser.emailAddress,
    authToken: req.user.authToken,
    greenlitApiId: greenlitUser.id,
    weekStartDay: weekstart,
    currencyCode: currency,
    timezone
  }

  return setup(payload, req)
    .then((response) => {
      const { authToken } = payload
      return UserProfile.findOne({ authToken })
        .then(existingProfile => {
          if (existingProfile) { throw new Error('User profile has already been setup') }
        })
        .then(() => {
          const userProfile = new UserProfile({
            timezone: payload.timezone,
            weekstart: payload.weekStartDay,
            currency: payload.currencyCode,
            userid: req.user.id
          })

          userProfile.save()
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

function getAuthorizeHeader(req) {
  return { 'Authorization': `Bearer ${req.user.authToken}` }
}

module.exports = { setupUser }
