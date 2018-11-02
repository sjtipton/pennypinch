const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql

const ApiUserType = new GraphQLObjectType({
  name: 'ApiUserType',
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    auth_token: { type: GraphQLString }
  }
})

module.exports = ApiUserType
