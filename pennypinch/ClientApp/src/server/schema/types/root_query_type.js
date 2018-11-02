const graphql = require('graphql')
const { GraphQLObjectType } = graphql
const ApiUserType = require('./api_user_type')
const UserProfileType = require('./user_profile_type')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: ApiUserType,
      resolve: (parentValue, args, req) => {
        return req.user
      }
    },
    userProfile: {
      type: UserProfileType,
      resolve: (parentValue, args, req) => {
        return req.userProfile
      }
    }
  }
})

module.exports = RootQueryType
