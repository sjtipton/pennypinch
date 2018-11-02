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

module.exports = { register, authenticate }
