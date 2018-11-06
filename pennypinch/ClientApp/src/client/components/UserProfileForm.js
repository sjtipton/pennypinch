import React, { Component } from 'react'

class UserProfileForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timezone: '',
      weekstart: '',
      currency: ''
    }
  }

  onSubmit(event) {
    event.preventDefault()

    this.props.onSubmit(this.state)
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.onSubmit.bind(this)} className="col s6">
          <div className="input-field">
            <input
                placeholder="Timezone"
                value={this.state.timezone}
                onChange={e => this.setState({ timezone: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
                placeholder="Starting Day of Week"
                value={this.state.weekstart}
                onChange={e => this.setState({ weekstart: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
                placeholder="Currency Preference"
                value={this.state.currency}
                onChange={e => this.setState({ currency: e.target.value })}
            />
          </div>

          <div className="errors">
            {this.props.errors.map(error => <div key={error}>{error}</div>)}
          </div>

          <button className="btn">Submit</button>
        </form>
      </div>
    )
  }
}

export default UserProfileForm
