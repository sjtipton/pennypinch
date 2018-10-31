import React, { Component } from 'react'
import { hashHistory } from 'react-router'

class DashboardSetup extends Component {
  constructor(props) {
    super(props)
  }

  componentWillUpdate(nextProps) {
    console.log(nextProps.data.user)
    // if the user already has complete userProfile, redirect to dashboard
    if (this.hasCompleteProfile(nextProps.data.userProfile)) {
      // redirect to dashboard
      hashHistory.push('/dashboard')
    }
  }

  hasCompleteProfile({ timezone, weekstart, currency }) {
    console.log(timezone, weekstart, currency)
    return !!(timezone && weekstart && currency)
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
