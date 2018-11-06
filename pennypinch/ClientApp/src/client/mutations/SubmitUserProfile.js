import gql from 'graphql-tag'

export default gql`
  mutation SubmitUserProfile($timezone: String, $weekstart: WeekStartType, $currency: String) {
    submitUserProfile(timezone: $timezone, weekstart: $weekstart, currency: $currency) {
      timezone
      weekstart
      currency
      userid
      scrimpApiId
    }
  }
`
