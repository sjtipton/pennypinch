import gql from 'graphql-tag'

export default gql`
  mutation UpdateUserProfile($timezone: String, $weekstart: WeekStartType, $currency: String) {
    updateUserProfile(timezone: $timezone, weekstart: $weekstart, currency: $currency) {
      timezone
      weekstart
      currency
      greenlitApiId
      scrimpApiId
    }
  }
`
