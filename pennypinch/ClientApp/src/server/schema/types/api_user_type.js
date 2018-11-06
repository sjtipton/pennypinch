const graphql = require('graphql')
const mongoose = require('mongoose')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql
const UserProfileType = require('./user_profile_type')
const { UserProfileSchema } = require('../../models/userProfile')
const UserProfile = mongoose.model('userProfile', UserProfileSchema)

const ApiUserType = new GraphQLObjectType({
  name: 'ApiUserType',
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    profile: {
      type: UserProfileType,
      resolve: (parentValue, args, req) => {
        const userid = parentValue.id
        console.log('parent', parentValue)
        console.log('userid', userid)
        // TODO we will know the greenlitApiId at this point, but we won't know the scrimpApiId
        //  so maybe we need to attach it to the ApiUserType, and have the profile pull it off the parent?
        return UserProfile.findOne({ userid })
      }
    }
  }
})

module.exports = ApiUserType
