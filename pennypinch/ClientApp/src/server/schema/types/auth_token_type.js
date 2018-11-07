const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql

const AuthTokenType = new GraphQLObjectType({
  name: 'AuthTokenType',
  fields: {
    userId: { type: GraphQLID },
    apiId: { type: GraphQLID },
    authToken: { type: GraphQLString },
    expiresIn: { type: GraphQLString },
    issuedAt: { type: GraphQLString }
  }
})

module.exports = AuthTokenType
