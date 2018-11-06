const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GreenlitUserSchema = new Schema({
  id: String,
  email: String
})

mongoose.model('greenlitApiUser', GreenlitUserSchema)

module.exports = GreenlitUserSchema
