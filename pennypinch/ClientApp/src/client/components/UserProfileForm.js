import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import zip2tz from 'zipcode-to-timezone'
import { graphql } from 'react-apollo'
import query from '../queries/CurrentUser'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
})

const currencies = [
  {
    value: 'USD',
    label: '$ - USD'
  },
  {
    value: 'EUR',
    label: '€ - EUR'
  },
  {
    value: 'BTC',
    label: '฿ - BTC'
  },
  {
    value: 'JPY',
    label: '¥ - JPY'
  }
]

const days = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY'
]

class UserProfileForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timezone: '',
      weekstart: '',
      currency: '',
      zipcode: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps.data.user

    if (user && user.profile) {
      const { timezone, weekstart, currency } = nextProps.data.user.profile

      this.setState({ timezone })
      this.setState({ weekstart })
      this.setState({ currency })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.zipcode.length === 5 && this.state.zipcode !== prevState.zipcode) {
      this.setTimezone(this.state.zipcode)
    }
  }

  setTimezone(zipcode) {
    let tz = zip2tz.lookup(zipcode)
    this.setState({ timezone: tz })
  }

  handleSave(event) {
    this.props.onSubmit(this.state)
  }

  render() {
    const { classes } = this.props

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
            id="zipcode-lookup"
            label="Zip Code"
            placeholder="Zip Code"
            className={classes.textField}
            value={this.state.zipcode}
            onChange={e => this.setState({ zipcode: e.target.value })}
            helperText="Enter your local US Zip Code"
            margin="normal"
            fullWidth
            variant="outlined"
        />

        <TextField
            disabled
            id="timezone"
            label="Timezone"
            placeholder="Timezone"
            className={classes.textField}
            value={this.state.timezone}
            helperText="Will be based on your location"
            margin="normal"
            fullWidth
            variant="outlined"
        />

        <TextField
            id="select-weekstart"
            select
            label="Starting Day of Week"
            placeholder="Starting Day of Week"
            className={classes.textField}
            value={this.state.weekstart}
            onChange={e => this.setState({ weekstart: e.target.value })}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Choose your preferred starting day of the week"
            margin="normal"
            fullWidth
            variant="outlined"
        >
          {days.map((day, index) => <MenuItem key={index} value={day}>{day}</MenuItem>)}
        </TextField>

        <TextField
            id="select-currency"
            select
            label="Currency Preference"
            placeholder="Currency Preference"
            className={classes.textField}
            value={this.state.currency}
            onChange={e => this.setState({ currency: e.target.value })}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Select your currency preference"
            margin="normal"
            fullWidth
            variant="outlined"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <div className="errors">
          {this.props.errors.map(error => <div key={error}>{error}</div>)}
        </div>

        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSave.bind(this)}>
          <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
          Save
        </Button>
      </form>
    )
  }
}

UserProfileForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  graphql(query)(UserProfileForm)
)
