const graphql = require('graphql')
const { GraphQLEnumType } = graphql

const WeekStartType = new GraphQLEnumType({
  name: 'WeekStartType',
  values: {
    SUNDAY: { value: 0 },
    MONDAY: { value: 1 },
    TUESDAY: { value: 2 },
    WEDNESDAY: { value: 3 },
    THURSDAY: { value: 4 },
    FRIDAY: { value: 5 },
    SATURDAY: { value: 6 }
  }
})

module.exports = WeekStartType
