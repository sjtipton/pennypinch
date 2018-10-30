const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const graphqlHTTP = require('express-graphql')
const gql = require('graphql-tag')
const { buildASTSchema } = require('graphql')

const UserModel = require('./model/model')

mongoose.connect('mongodb://localhost:27017/pennypinch-mongodb', { useNewUrlParser: true })
mongoose.connection.on('error', error => console.log(error))
mongoose.Promise = global.Promise

require('./auth/auth')

const POSTS = [
    { author: "John Doe", body: "Hello world" },
    { author: "Jane Doe", body: "Hi, planet" }
]

const schema = buildASTSchema(gql`
    type Query {
        posts: [Post]
        post(id: ID!): Post
    }

    type Post {
        id: ID
        author: String,
        body: String
    }

    type Mutation {
        submitPost(input: PostInput!): Post
    }

    input PostInput {
        id: ID
        author: String!
        body: String!
    }
`)

const mapPost = (post, id) => post && ({ id, ...post })

const root = {
    posts: () => POSTS.map(mapPost),
    post: ({ id }) => mapPost(POSTS[id], id),
    submitPost: ({ input: { id, author, body } }) => {
        const post = { author, body }
        let index = POSTS.length

        if (id != null && id >= 0 && id < POSTS.length) {
            if (POSTS[id].authorId !== authorId) return null

            POSTS.splice(id, 1, post)
            index = id
        } else {
            POSTS.push(post)
        }

        return mapPost(post, index)
    }
}

const app = express()
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

app.use(bodyParser.urlencoded({ extended: false }))

const routes = require('./routes/routes')
const secureRoute = require('./routes/secure-routes')

app.use('/', routes)

// We plugin our jwt strategy as middleware so only verified users can access this route
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute)

// Handle errors
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({ error: err })
})

const port = process.env.PORT || 3900
app.listen(port)
console.log(`Server started, listening at localhost:${port}`)
console.log(`Running a GraphQL API server at localhost:${port}/graphql`)
