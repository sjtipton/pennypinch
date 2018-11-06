const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GreenlitAuthTokenSchema = new Schema({
  id: String,
  authToken: String,
  expiresIn: Number,
  issuedAt: String
})

const GreenlitAuthToken = mongoose.model('GreenlitAuthToken', GreenlitAuthTokenSchema)

module.exports = { GreenlitAuthTokenSchema, GreenlitAuthToken }
