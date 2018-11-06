const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} = graphql
const ApiUserType = require('./api_user_type')

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
    }
  }
})

module.exports = RootQueryType
