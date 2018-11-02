const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = graphql

const UserProfileType = new GraphQLObjectType({
  name: 'UserProfileType',
  fields: {
    timezone: { type: GraphQLString },
    weekstart: { type: GraphQLInt },
    currency: { type: GraphQLString },
    userid: { type: GraphQLString }
  }
})

module.exports = UserProfileType
