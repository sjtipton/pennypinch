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

const CategoryCard = (props) => {
  const { classes } = props

  const helpText = 'Categorize all transactions such as "Money being set aside" and label them with a specific color.'

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Add/Edit Categories
          <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={helpText} placement="right">
            <HelpRoundedIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
          </Tooltip>
        </Typography>
        <Typography component="p">
          Create and manage existing categories to help categorize and visualize your transactions.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" href="#contained-buttons">Add a Category</Button>
        <Button size="small" variant="contained" href="#contained-buttons">Edit a Category</Button>
      </CardActions>
    </Card>
  )
}

CategoryCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CategoryCard)
