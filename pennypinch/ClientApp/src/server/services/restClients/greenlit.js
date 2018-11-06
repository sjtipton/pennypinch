const axios = require('axios')
const mongoose = require('mongoose')
const { GreenlitAuthTokenSchema } = require('../../models/greenlitAuthToken')
const GreenlitAuthToken = mongoose.model('greenlitAuthToken', GreenlitAuthTokenSchema)

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
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${baseURL}/users/${id}`,
      headers: getAuthorizationHeader(req)
    }).then(response => {
      resolve(response.data)
    }).catch(ex => {
      reject(ex)
    })
  })
}

function getAuthorizationHeader(req) {
  const { id } = req.user

  return GreenlitAuthToken.findOne({ id })
    .then((found) => {
      console.log(found.authToken)
      return { 'Authorization': `Bearer ${found.authToken}` }
    }).catch(ex => {
      throw new Error(ex)
    })
}

module.exports = { register, authenticate, find }
