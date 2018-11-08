import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { graphql } from 'react-apollo'
import query from '../queries/CurrentUser'
import mutation from '../mutations/Logout'
import { hashHistory } from 'react-router'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

class Header extends Component {
  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query }]
    })
  }

  onLoginClick() {
    hashHistory.push('/login')
  }

  onSignupClick() {
    hashHistory.push('/signup')
  }

  renderBrandMessage() {
    const { user } = this.props.data

    if (user) {
      const { firstName, lastName } = user
      return `Welcome ${firstName} ${lastName}`
    } else {
      return 'Pennypinch'
    }
  }

  renderButtons() {
    const { loading, user } = this.props.data

    if (loading) { return <div /> }

    if (user) {
      return (
        <Button color="inherit" onClick={this.onLogoutClick.bind(this)}>Logout</Button>
      )
    } else {
      return (
        <div>
          <Button color="inherit" onClick={this.onSignupClick.bind(this)}>Signup</Button>
          <Button color="inherit" onClick={this.onLoginClick.bind(this)}>Login</Button>
        </div>
      )
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {this.renderBrandMessage()}
            </Typography>
            {this.renderButtons()}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  graphql(mutation)(
    graphql(query)(Header)
  )
)
