const axios = require('axios')

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
  return { 'Authorization': `Bearer ${req.user.authToken}` }
}

module.exports = { register, authenticate, find }
