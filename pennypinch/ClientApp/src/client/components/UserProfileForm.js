import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FilledInput from '@material-ui/core/FilledInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import moment from 'moment-timezone'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
})

class UserProfileForm extends React.Component {
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
    const { classes } = this.props

    return (
      <form className={classes.root} autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="timezone">Timezone</InputLabel>
          <Select
              value={this.state.timezone}
              onChange={e => this.setState({ timezone: e.target.value })}
              input={<Input name="timezone" id="timezone" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="America/New_York">America/New_York</MenuItem>
          </Select>
          <FormHelperText>Choose your current timezone</FormHelperText>
        </FormControl>




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
    )
  }
}

UserProfileForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserProfileForm)
