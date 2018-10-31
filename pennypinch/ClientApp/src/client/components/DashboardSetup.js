import React, { Component } from 'react'
import { hashHistory } from 'react-router'

class DashboardSetup extends Component {
  constructor(props) {
    super(props)
  }

  componentWillUpdate(nextProps) {
    console.log(this.props.data.user, nextProps.data.user)
    // if the user already has data in all user properties, redirect to dashboard (complete profile)
    //if (!this.props.data.user && nextProps.data.user) {
    //  // redirect to dashboard
    //  hashHistory.push('/dashboard')
    //}
  }

  render() {
    return (
      <div>
        <div>You are logged in.</div>

        <h3>Dashboard Setup</h3>

        <div>Complete your user profile. (TODO)</div>
      </div>
    )
  }
}

export default DashboardSetup
