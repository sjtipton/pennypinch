import React, { Component } from 'react'
import NewUserForm from './NewUserForm'
import mutation from '../mutations/Signup'
import { graphql } from 'react-apollo'
import query from '../queries/CurrentUser'
import { hashHistory } from 'react-router'

class SignupForm extends Component {
  constructor(props) {
    super(props)

    this.state = { errors: [] }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      // redirect to dashboard-setup
      hashHistory.push('/dashboard-setup')
    }
  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      this.setState({ errors })
    })
  }

  // TODO this will actually need to render additional fields eventually
  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <NewUserForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
      </div>
    )
  }
}

export default graphql(query)(
  graphql(mutation)(SignupForm)
)
