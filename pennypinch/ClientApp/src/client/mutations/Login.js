import gql from 'graphql-tag'

export default gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
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
