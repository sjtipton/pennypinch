const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AuthTokenSchema = new Schema({
  apiId: String,
  authToken: String,
  expiresIn: Number,
  issuedAt: String
})

const AuthToken = mongoose.model('authToken', AuthTokenSchema)

module.exports = { AuthTokenSchema, AuthToken }
