import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Fade from '@material-ui/core/Fade'
import HelpRoundedIcon from '@material-ui/icons/HelpRounded'

const styles = theme => ({
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

const AccountCard = (props) => {
  const { classes } = props

  const helpText = 'Citibank Visa Card with a $2,478.47 balance on it needs to be added as an account.'

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Add/Manage Accounts
          <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={helpText} placement="right">
            <HelpRoundedIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
          </Tooltip>
        </Typography>
        <Typography component="p">
          Add and make changes to existing accounts, which will make up your transactions.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" href="#/add-account">Add Account</Button>
        <Button size="small" variant="contained" href="#/user-accounts">View All Accounts</Button>
      </CardActions>
    </Card>
  )
}

AccountCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AccountCard)
