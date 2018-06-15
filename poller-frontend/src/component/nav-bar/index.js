//packages
import React from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import {compose} from 'recompose'

//Methods
import { storeUserProfile } from '../../action/user-profile-actions.js'
import { setAuthToken } from '../../action/auth0-actions.js'
import { login, logout } from '../../action/auth-actions.js'

import * as util from '../../lib/util.js'
//These will be used, to store id of the user in the database...




import NavMenu from '../nav-menu/index.js'


//Style

import {grey50} from 'material-ui/styles/colors';


//new Material UI
import MaterialStyles from '../../style/material-ui-style'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';



const styles = theme =>({
  appBar: theme.overrides.MuiAppBar,

})


class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      landing: true,
      loggedIn: this.props.loggedIn,
      openMenu: false,
    }
  }

  componentWillMount() {
    console.log('this.props.history on the NAVBAR', this.props)
  }


  handleOpenMenu(){
    this.setState({
      openMenu: true,
    });
  }

  handleOnRequestChange(value){
    this.setState({
      openMenu: value,
    });
  }

  render() {
    console.log('NAVBAR', this.props)
    const { classes } = this.props;
    return (
      <div>
          <AppBar position="static" className={classes.appBar}>
          <Toolbar>
         
            <Typography variant="display1" color="inherit" style={{flex: 1}}>
              Poller
            </Typography>
            <NavMenu/>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn
})

export const mapDispatchToProps = dispatch => ({
  storeUserProfile: (profile) => dispatch(storeUserProfile(profile)),
  setAuthToken: (token) => dispatch(setAuthToken(token)),
  login: () => dispatch(login()),
  logout: () => dispatch(logout()),
})


NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,

};


export default compose(
  // These are both single-argument HOCs
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles , {withTheme: true})
)(NavBar)



// export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar)));

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))