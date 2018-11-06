const axios = require('axios')
const mongoose = require('mongoose')
const { AuthTokenSchema } = require('../../models/authToken')
const AuthToken = mongoose.model('authToken', AuthTokenSchema)

const baseURL = 'http://localhost:8000'

function register({ email, password, firstName, lastName }) {
  return new Promise((resolve, reject) => {
    axios.post(`${baseURL}/users/register`, { emailAddress: email, password, firstName, lastName })
      .then(response => {
        resolve(response.data)
      }).catch((ex) => {
        reject(ex)
      })
  })
}

function authenticate({ email, password }) {
  return new Promise((resolve, reject) => {
    axios.post(`${baseURL}/users/authenticate`, { emailAddress: email, password })
      .then(response => {
        resolve(response.data)
      }).catch((ex) => {
        reject(ex)
      })
  })
}

function find(id, req) {
  return getAuthorizationHeader(id)
    .then((authHeaders) => {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `${baseURL}/users/${id}`,
          headers: authHeaders
        }).then(response => {
          resolve(response.data)
        }).catch(ex => {
          reject(ex)
        })
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

module.exports = { register, authenticate, find, getAuthToken }
