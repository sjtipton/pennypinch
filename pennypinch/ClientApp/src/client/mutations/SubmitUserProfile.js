import gql from 'graphql-tag'

export default gql`
  mutation SubmitUserProfile($timezone: String, $weekstart: WeekStartType, $currency: String, $userid: String) {
    submitUserProfile(timezone: $timezone, weekstart: $weekstart, currency: $currency, userid: $userid) {
      timezone
      weekstart
      currency
      userid
    }
  }
`
