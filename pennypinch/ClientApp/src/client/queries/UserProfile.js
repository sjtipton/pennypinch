import gql from 'graphql-tag'

export default gql`
  {
    userProfile {
      timezone
      weekstart
      currency
      userid
    }
  }
`
