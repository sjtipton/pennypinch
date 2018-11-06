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
      }
      greenlitAuthToken {
        id
        name
        authToken
        expiresIn
        issuedAt
      },
      scrimpAuthToken {
        id
        name
        authToken
        expiresIn
        issuedAt
      }
    }
  }
`
