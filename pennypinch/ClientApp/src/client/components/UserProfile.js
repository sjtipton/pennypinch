import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import EditUserProfileForm from './EditUserProfileForm'
import { hashHistory } from 'react-router'
import mutation from '../mutations/UpdateUserProfile'
import { graphql } from 'react-apollo'
import query from '../queries/CurrentUser'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.state = { errors: [] }
  }

  onEditEmailClick() {
    hashHistory.push('/edit-email')
  }

  onEditNamesClick() {
    hashHistory.push('/edit-names')
  }

  onEditPasswordClick() {
    hashHistory.push('/edit-password')
  }

  onSubmit({ timezone, weekstart, currency }) {
    const { profile } = this.props.data.user
    const scrimpApiId = profile.scrimpApiId

    this.props.mutate({
      variables: { timezone, weekstart, currency, scrimpApiId },
      refetchQueries: [{ query }]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      this.setState({ errors })
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <h3>Edit User Profile</h3>

        <Grid container spacing={24}>
          <Grid item xs>
            <Button variant="contained" color="primary" onClick={this.onEditEmailClick.bind(this)}>Change Email</Button>
          </Grid>
          <Grid item xs>
            <Button variant="contained" color="primary" onClick={this.onEditPasswordClick.bind(this)}>Change Password</Button>
          </Grid>
          <Grid item xs>
            <Button variant="contained" color="primary" onClick={this.onEditNamesClick.bind(this)}>Change Names</Button>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs>
            <EditUserProfileForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  graphql(query)(
    graphql(mutation)(UserProfile)
  )
)
