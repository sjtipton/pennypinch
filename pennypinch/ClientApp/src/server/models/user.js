const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  id: String,
  email: String,
  firstName: String,
  lastName: String
})

mongoose.model('user', UserSchema)

module.exports = UserSchema
