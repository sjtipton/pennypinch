import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'

import App from './components/App'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Dashboard from './components/Dashboard'
import requireAuth from './components/requireAuth'

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  link: createHttpLink({ uri: 'http://localhost:3000/graphql' }),
  cache: new InMemoryCache()
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="dashboard" component={requireAuth(Dashboard)} />
        </Route>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
