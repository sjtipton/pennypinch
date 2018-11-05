import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import UserProfileForm from './UserProfileForm'
import mutation from '../mutations/SubmitUserProfile'
import { graphql } from 'react-apollo'
import query from '../queries/CurrentUser'

class DashboardSetup extends Component {
  constructor(props) {
    super(props)

    this.state = { errors: [] }
  }

  componentWillUpdate(nextProps) {
    // if the user already has complete userProfile, redirect to dashboard
    if (this.hasCompleteProfile(nextProps.data.user.profile)) {
      // redirect to dashboard
      hashHistory.push('/dashboard')
    }
  }

  hasCompleteProfile(profile) {
    if (!profile) return false
    const { timezone, weekstart, currency } = profile
    return !!(timezone && weekstart && currency)
  }

  onSubmit({ timezone, weekstart, currency }) {
    this.props.mutate({
      variables: { timezone, weekstart, currency },
      refetchQueries: [{ query }]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      this.setState({ errors })
    })
  }

  render() {
    return (
      <div>
        <div>You are logged in.</div>

        <h3>Dashboard Setup</h3>

        <div>Complete your user profile.</div>
        <UserProfileForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
      </div>
    )
  }
}

export default graphql(query)(
  graphql(mutation)(DashboardSetup)
)
