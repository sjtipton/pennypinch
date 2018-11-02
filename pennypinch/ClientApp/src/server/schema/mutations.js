const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = graphql

const ApiUserType = require('./types/api_user_type')
const UserProfileType = require('./types/user_profile_type')
const AuthService = require('../services/auth')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: ApiUserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
      },
      resolve: (parentValue, { email, password, firstName, lastName }, req) => {
        return AuthService.signup({ email, password, firstName, lastName, req })
      }
    },
    submitUserProfile: {
      type: UserProfileType,
      args: {
        timezone: { type: GraphQLString },
        weekstart: { type: GraphQLInt },
        currency: { type: GraphQLString },
        userid: { type: GraphQLString }
      },
      resolve: (parentValue, { timezone, weekstart, currency, userid }, req) => {
        // POST to scrimp API with payload to create user
        // this will be in a service layer, similar to AuthService, that will find the user to get the existing user details
        // and send those details with the profile details and userid (GreenlitApiKey) to create the scrimp user
      }
    },
    logout: {
      type: ApiUserType,
      resolve: (parentValue, args, req) => {
        const { user } = req
        req.logout()
        return user
      }
    },
    login: {
      type: ApiUserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: (parentValue, { email, password }, req) => {
        return AuthService.login({ email, password, req })
      }
    }
  }
})

module.exports = mutation
