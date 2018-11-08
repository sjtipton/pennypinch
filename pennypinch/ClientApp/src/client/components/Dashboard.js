import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import query from '../queries/CurrentUser'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = { errors: [] }
  }

  componentWillUpdate(nextProps) {
    console.log('user at update lifecycle level', nextProps.data.user)
  }

  render() {
    return (
      <div>
        <h3>Dashboard</h3>
      </div>
    )
  }
}

export default graphql(query)(Dashboard)
