import gql from 'graphql-tag'

export default gql`
  {
    user {
      id
      email
      authTokens {
        apiId
        authToken
        expiresIn
        issuedAt
      }
      profile {
        timezone
        weekstart
        currency
        userid
        scrimpApiId
      }
    }
  }
`
