import gql from 'graphql-tag'

export default gql`
  {
    user {
      id
      email
      firstName
      lastName
      authTokens {
        userId
        apiId
        authToken
        expiresIn
        issuedAt
      }
      profile {
        timezone
        weekstart
        currency
        greenlitApiId
        scrimpApiId
      }
    }
  }
`
