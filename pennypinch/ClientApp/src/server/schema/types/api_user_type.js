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

const ApiUserType = new GraphQLObjectType({
  name: 'ApiUserType',
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    authToken: { type: GraphQLString },
    profile: {
      type: UserProfileType,
      resolve: (parentValue, args, req) => {
        const userid = parentValue.id
        return UserProfile.findOne({ userid })
      }
    }
  }
})

module.exports = ApiUserType
