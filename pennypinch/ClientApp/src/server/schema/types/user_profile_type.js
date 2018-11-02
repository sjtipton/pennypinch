const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} = graphql

const UserProfileType = new GraphQLObjectType({
  name: 'UserProfileType',
  fields: {
    timezone: { type: GraphQLString },
    weekstart: { type: GraphQLInt },
    currency: { type: GraphQLString },
    userid: { type: GraphQLID }
  }
})

module.exports = UserProfileType
