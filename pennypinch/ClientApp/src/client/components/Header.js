import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded'
import AccountBalanceIcon from '@material-ui/icons/AccountBalanceRounded'
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded'
import AttachMoneyIcon from '@material-ui/icons/AttachMoneyRounded'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import Fade from '@material-ui/core/Fade'
import { graphql } from 'react-apollo'
import query from '../queries/CurrentUser'
import mutation from '../mutations/Logout'
import { hashHistory } from 'react-router'

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  brandMargin: {
    marginLeft: 12
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
})

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = { open: false }
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query }]
    })
  }

  onEditProfileClick() {
    hashHistory.push('/user-profile')
  }

  onAccountAddClick() {
    hashHistory.push('/add-account')
  }

  onAccountEditClick() {
    hashHistory.push('/edit-account')
  }

  onCategoryAddClick() {
    hashHistory.push('/add-category')
  }

  onCategoryEditClick() {
    hashHistory.push('/edit-category')
  }

  onTransactionAddClick() {
    hashHistory.push('/add-transaction')
  }

  onTransactionEditClick() {
    hashHistory.push('/edit-transaction')
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
      return <div style={{ marginLeft: '12px' }}>Pennypinch</div>
    }
  }

  renderDrawer(classes, theme) {
    return (
      <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={this.handleDrawerClose.bind(this)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={this.onEditProfileClick.bind(this)}>
            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Edit User Profile" placement="right" disableHoverListener={this.state.open}>
              <ListItemIcon><PersonRoundedIcon /></ListItemIcon>
            </Tooltip>
            <ListItemText primary="Edit User Profile" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={this.onAccountAddClick.bind(this)}>
            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Add an Account" placement="right" disableHoverListener={this.state.open}>
              <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
            </Tooltip>
            <ListItemText primary="Add an Account" />
          </ListItem>
          <ListItem button onClick={this.onAccountEditClick.bind(this)}>
            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Edit an Account" placement="right" disableHoverListener={this.state.open}>
              <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
            </Tooltip>
            <ListItemText primary="Edit an Account" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={this.onCategoryAddClick.bind(this)}>
            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Add a Category" placement="right" disableHoverListener={this.state.open}>
              <ListItemIcon><CategoryRoundedIcon /></ListItemIcon>
            </Tooltip>
            <ListItemText primary="Add a Category" />
          </ListItem>
          <ListItem button onClick={this.onCategoryEditClick.bind(this)}>
            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Edit a Category" placement="right" disableHoverListener={this.state.open}>
              <ListItemIcon><CategoryRoundedIcon /></ListItemIcon>
            </Tooltip>
            <ListItemText primary="Edit a Category" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={this.onTransactionAddClick.bind(this)}>
            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Add a Transaction" placement="right" disableHoverListener={this.state.open}>
              <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
            </Tooltip>
            <ListItemText primary="Add a Transaction" />
          </ListItem>
          <ListItem button onClick={this.onTransactionEditClick.bind(this)}>
            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Edit a Transaction" placement="right" disableHoverListener={this.state.open}>
              <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
            </Tooltip>
            <ListItemText primary="Edit a Transaction" />
          </ListItem>
        </List>
      </Drawer>
    )
  }

  renderHeader(classes, theme) {
    const { user } = this.props.data

    if (user) {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
              position="fixed"
              className={classNames(classes.appBar, {
                [classes.appBarShift]: this.state.open
              })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen.bind(this)}
                  className={classNames(classes.menuButton, {
                    [classes.hide]: this.state.open
                  })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
                {this.renderBrandMessage()}
              </Typography>
              {this.renderButtons()}
            </Toolbar>
          </AppBar>

          {this.renderDrawer(classes, theme)}
        </div>
      )
    } else {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
              position="fixed"
              className={classNames(classes.appBar, {
                [classes.appBarShift]: this.state.open
              })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen.bind(this)}
                  className={classNames(classes.menuButton, {
                    [classes.hide]: true
                  })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
                {this.renderBrandMessage()}
              </Typography>
              {this.renderButtons()}
            </Toolbar>
          </AppBar>
        </div>
      )
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
    const { classes, theme } = this.props

    return this.renderHeader(classes, theme)
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(
  graphql(mutation)(
    graphql(query)(Header)
  )
)
