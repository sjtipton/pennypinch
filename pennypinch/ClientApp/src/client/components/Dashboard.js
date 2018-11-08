import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import UserProfileCard from './UserProfileCard'
import AccountCard from './AccountCard'
import CategoryCard from './CategoryCard'
import TransactionCard from './TransactionCard'
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

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = { errors: [] }
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <h3>Dashboard</h3>

        <Grid container spacing={24}>
          <Grid item xs>
            <UserProfileCard />
          </Grid>
          <Grid item xs>
            <AccountCard />
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs>
            <CategoryCard />
          </Grid>
          <Grid item xs>
            <TransactionCard />
          </Grid>
        </Grid>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  graphql(query)(Dashboard)
)
