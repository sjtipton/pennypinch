const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql
const WeekStartType = require('./week_start_type')

const UserProfileType = new GraphQLObjectType({
  name: 'UserProfileType',
  fields: {
    timezone: { type: GraphQLString },
    weekstart: { type: WeekStartType },
    currency: { type: GraphQLString },
    userid: { type: GraphQLID },
    scrimpApiId: { type: GraphQLID }
  }
})

module.exports = UserProfileType
