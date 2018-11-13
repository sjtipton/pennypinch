import gql from 'graphql-tag'

export default gql`
  mutation UpdateUserProfile($timezone: String, $weekstart: WeekStartType, $currency: String, $scrimpApiId: ID!) {
    updateUserProfile(timezone: $timezone, weekstart: $weekstart, currency: $currency, scrimpApiId: $scrimpApiId) {
      timezone
      weekstart
      currency
      greenlitApiId
      scrimpApiId
    }
  }
`
