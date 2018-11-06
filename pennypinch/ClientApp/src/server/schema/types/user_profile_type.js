const graphql = require('graphql')
const mongoose = require('mongoose')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql
const WeekStartType = require('./week_start_type')
const AuthTokenType = require('./auth_token_type')
const { GreenlitAuthTokenSchema } = require('../../models/greenlitAuthToken')
const { ScrimpAuthTokenSchema } = require('../../models/scrimpAuthToken')
const GreenlitAuthToken = mongoose.model('greenlitAuthToken', GreenlitAuthTokenSchema)

const UserProfileType = new GraphQLObjectType({
  name: 'UserProfileType',
  fields: {
    timezone: { type: GraphQLString },
    weekstart: { type: WeekStartType },
    currency: { type: GraphQLString },
    greenlitApiId: { type: GraphQLID },
    scrimpApiId: { type: GraphQLID },
    greenlitAuthToken: {
      type: AuthTokenType,
      resolve: (parentValue, args, req) => {
        const id = parentValue.greenlitApiId
        return GreenlitAuthToken.findOne({ id })
      }
    },
    scrimpAuthToken: {
      type: AuthTokenType,
      resolve: (parentValue, args, req) => {
        const id = parentValue.scrimpApiId
        return GreenlitAuthToken.findOne({ id })
      }
    }
  }
})

module.exports = UserProfileType
