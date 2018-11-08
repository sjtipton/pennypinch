const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserProfileSchema = new Schema({
  timezone: String,
  weekstart: Number,
  currency: String,
  greenlitApiId: String,
  scrimpApiId: Number
})

mongoose.model('userProfile', UserProfileSchema)

module.exports = UserProfileSchema
