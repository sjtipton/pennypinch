const graphql = require('graphql')
const mongoose = require('mongoose')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql
const UserProfileType = require('./user_profile_type')
const { UserProfileSchema } = require('../../models/userProfile')
const UserProfile = mongoose.model('userProfile', UserProfileSchema)
const AuthTokenType = require('./auth_token_type')
const { GreenlitAuthTokenSchema } = require('../../models/greenlitAuthToken')
const { ScrimpAuthTokenSchema } = require('../../models/scrimpAuthToken')
const GreenlitAuthToken = mongoose.model('greenlitAuthToken', GreenlitAuthTokenSchema)
const ScrimpAuthToken = mongoose.model('scrimpAuthToken', ScrimpAuthTokenSchema)

const ApiUserType = new GraphQLObjectType({
  name: 'ApiUserType',
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    profile: {
      type: UserProfileType,
      resolve: (parentValue, args, req) => {
        const userid = parentValue.id
        return UserProfile.findOne({ userid })
      }
    },
    greenlitAuthToken: {
      type: AuthTokenType,
      resolve: (parentValue, args, req) => {
        const name = "GREENLIT"
        return GreenlitAuthToken.findOne({ name })
      }
    },
    scrimpAuthToken: {
      type: AuthTokenType,
      resolve: (parentValue, args, req) => {
        const name = "SCRIMP"
        return GreenlitAuthToken.findOne({ name })
      }
    }
  }
})

module.exports = ApiUserType
