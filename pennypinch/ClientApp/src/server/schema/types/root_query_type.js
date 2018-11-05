const graphql = require('graphql')
const mongoose = require('mongoose')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} = graphql
const ApiUserType = require('./api_user_type')
const UserProfileType = require('./user_profile_type')
const { UserProfileSchema } = require('../../models/userProfile')
const UserProfile = mongoose.model('userProfile', UserProfileSchema)

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: ApiUserType,
      args: {
        id: { type: GraphQLID },
        email: { type: GraphQLString }
      },
      resolve: (parentValue, args, req) => {
        return req.user
      }
    },
    userProfile: {
      type: UserProfileType,
      resolve: (parentValue, args, req) => {
        const userid = req.user.id
        // TODO attach resolver to helper so it can be reused throughout app
        return UserProfile.findOne({ userid })
      }
    }
  }
})

module.exports = RootQueryType
