const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScrimpAuthTokenSchema = new Schema({
  id: String,
  authToken: String,
  expiresIn: Number,
  issuedAt: String
})

const ScrimpAuthToken = mongoose.model('scrimpAuthToken', ScrimpAuthTokenSchema)

module.exports = { ScrimpAuthTokenSchema, ScrimpAuthToken }
