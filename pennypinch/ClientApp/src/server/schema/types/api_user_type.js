const graphql = require('graphql')
const mongoose = require('mongoose')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql
const AuthTokenType = require('./auth_token_type')
const UserProfileType = require('./user_profile_type')
const { UserProfileSchema } = require('../../models/userProfile')
const UserProfile = mongoose.model('userProfile', UserProfileSchema)
const { AuthTokenSchema } = require('../../models/authToken')
const AuthToken = mongoose.model('authToken', AuthTokenSchema)

const ApiUserType = new GraphQLObjectType({
  name: 'ApiUserType',
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    authTokens: {
      type: new GraphQLList(AuthTokenType),
      resolve: (parentValue, args, req) => {
        // retrieve all AuthTokens (e.g. Greenlit and Scrimp) for the current user
        return AuthToken.find({})
      }
    },
    profile: {
      type: UserProfileType,
      resolve: (parentValue, args, req) => {
        // locate the UserProfile by the userid
        const userid = parentValue.id
        return UserProfile.findOne({ userid })
      }
    }
  }
})

module.exports = ApiUserType
