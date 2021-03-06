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
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    authTokens: {
      type: new GraphQLList(AuthTokenType),
      resolve: (parentValue, args, req) => {
        // retrieve all AuthTokens (e.g. Greenlit and Scrimp) for the current user
        const { id } = parentValue
        return AuthToken.find({ userId: id })
      }
    },
    profile: {
      type: UserProfileType,
      resolve: (parentValue, args, req) => {
        // locate the UserProfile by the userid
        const { id } = parentValue
        return UserProfile.findOne({ greenlitApiId: id })
      }
    }
  }
})

module.exports = ApiUserType
