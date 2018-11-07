import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import TextField from '@material-ui/core/TextField'

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

class NewUserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  }

  handleSave(event) {
    this.props.onSubmit(this.state)
  }

  render() {
    const { classes } = this.props

    return (
      <form className={classes.container} noValidate>
        <TextField
            id="firstName"
            label="First Name"
            placeholder="First Name"
            className={classes.textField}
            value={this.state.firstName}
            onChange={e => this.setState({ firstName: e.target.value })}
            helperText="Enter your first name"
            margin="normal"
            fullWidth
            variant="outlined"
        />

        <TextField
            id="lastName"
            label="Last Name"
            className={classes.textField}
            value={this.state.lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
            helperText="Enter your last name"
            margin="normal"
            fullWidth
            variant="outlined"
        />

        <TextField
            id="email"
            label="Email Address"
            className={classes.textField}
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            helperText="Enter your email address"
            margin="normal"
            fullWidth
            variant="outlined"
        />

        <TextField
            id="password"
            label="Password"
            placeholder="Password"
            className={classes.textField}
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            helperText="Enter your password"
            margin="normal"
            fullWidth
            variant="outlined"

        />

        <div className="errors">
          {this.props.errors.map(error => <div key={error}>{error}</div>)}
        </div>

        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSave.bind(this)}>
          <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
          Sign Up
        </Button>
      </form>
    )
  }
}

NewUserForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NewUserForm)
