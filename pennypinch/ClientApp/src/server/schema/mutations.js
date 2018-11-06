const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql
const WeekStartType = require('./types/week_start_type')

const ApiUserType = require('./types/api_user_type')
const UserProfileType = require('./types/user_profile_type')
const AuthService = require('../services/auth')
const GreenlitRestClient = require('../services/restClients/greenlit')
const ScrimpRestClient = require('../services/restClients/scrimp')

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
        weekstart: { type: WeekStartType },
        currency: { type: GraphQLString },
        greenlitApiId: { type: GraphQLID },
        scrimpApiId: { type: GraphQLID }
      },
      resolve: (parentValue, { timezone, weekstart, currency }, req) => {
        const userid = req.user.id
        return GreenlitRestClient.find(userid, req)
          .then((greenlitUser) => {
            return ScrimpRestClient.setupUser({ greenlitUser, timezone, weekstart, currency, req })
          })
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
