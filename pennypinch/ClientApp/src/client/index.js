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
import DashboardSetup from './components/DashboardSetup'
import UserProfile from './components/UserProfile'
import EditPasswordForm from './components/EditPasswordForm'
import EditEmailForm from './components/EditEmailForm'
import EditNamesForm from './components/EditNamesForm'
import UserAccounts from './components/UserAccounts'
import AddAccountForm from './components/AddAccountForm'
import EditAccountForm from './components/EditAccountForm'
import UserCategories from './components/UserCategories'
import AddCategoryForm from './components/AddCategoryForm'
import EditCategoryForm from './components/EditCategoryForm'
import UserTransactions from './components/UserTransactions'
import AddTransactionForm from './components/AddTransactionForm'
import EditTransactionForm from './components/EditTransactionForm'
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
          <Route path="dashboard-setup" component={requireAuth(DashboardSetup)} />
          <Route path="dashboard" component={requireAuth(Dashboard)} />
          <Route path="user-profile" component={requireAuth(UserProfile)} />
          <Route path="edit-password" component={requireAuth(EditPasswordForm)} />
          <Route path="edit-email" component={requireAuth(EditEmailForm)} />
          <Route path="edit-names" component={requireAuth(EditNamesForm)} />
          <Route path="user-accounts" component={requireAuth(UserAccounts)} />
          <Route path="add-account" component={requireAuth(AddAccountForm)} />
          <Route path="edit-account" component={requireAuth(EditAccountForm)} />
          <Route path="user-categories" component={requireAuth(UserCategories)} />
          <Route path="add-category" component={requireAuth(AddCategoryForm)} />
          <Route path="edit-category" component={requireAuth(EditCategoryForm)} />
          <Route path="user-transactions" component={requireAuth(UserTransactions)} />
          <Route path="add-transaction" component={requireAuth(AddTransactionForm)} />
          <Route path="edit-transaction" component={requireAuth(EditTransactionForm)} />
        </Route>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
