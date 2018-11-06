import gql from 'graphql-tag'

export default gql`
  {
    user {
      id
      email
      profile {
        timezone
        weekstart
        currency
        greenlitApiId
        scrimpApiId
        greenlitAuthToken {
          id
          authToken
          expiresIn
          issuedAt
        }
        scrimpAuthToken {
          id
          authToken
          expiresIn
          issuedAt
        }
      }
    }
  }
`
