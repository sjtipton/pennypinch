import gql from 'graphql-tag'

export default gql`
  {
    user {
      id
      email
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
