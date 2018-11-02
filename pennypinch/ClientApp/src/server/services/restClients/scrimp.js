const axios = require('axios')

// TODO get url from config
const baseURL = 'http://localhost:4000/api'

function setupUser({ userid, timezone, weekstart, currency, req}) {
  return find({ userid, req })
    .then(user => {
      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        greenlitApiId: userid,
        timezone,
        weekStartDay: weekstart,
        currencyCode: currency,
        authToken: req.user.authToken
      }

      return setup(data, req)
        .then((result) => {
          console.log('result of setup', result)
        })
        .catch((err) => {
          console.log('failed', err)
        })
    })
}

function find({ id, req }) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${baseURL}/users/${id}`,
      headers: getAuthorizeHeader(req)
    }).then(response => {
      resolve(response.data)
    }).catch(ex => {
      reject(ex)
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

function getAuthorizeHeader(req) {
  console.log('token', req.user.authToken)
  return { 'Authorization': `Bearer ${req.user.authToken}` }
}

module.exports = { find, setupUser }
