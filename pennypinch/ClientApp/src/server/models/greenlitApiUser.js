const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const ObjectId = Schema.Types.ObjectId

const GreenlitUserSchema = new Schema({
  id: String,
  email: String,
  authToken: String
})

mongoose.model('greenlitApiUser', GreenlitUserSchema)

module.exports = GreenlitUserSchema
