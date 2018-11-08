import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}

const UserProfileCard = (props) => {
  const { classes } = props

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Edit User Profile
        </Typography>
        <Typography component="p">
          Make changes to your current user information, including email and password.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" href="#contained-buttons">Edit User Profile</Button>
      </CardActions>
    </Card>
  )
}

UserProfileCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserProfileCard)
