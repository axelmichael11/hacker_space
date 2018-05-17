//packages
import React from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'


//Methods
import { storeUserProfile } from '../../action/user-profile-actions.js'
import { setAuthToken } from '../../action/auth0-actions.js'
import { login, logout } from '../../action/auth-actions.js'

import * as util from '../../lib/util.js'
//These will be used, to store id of the user in the database...




import NavMenu from '../menu/loggedin-menu'


//Style
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import AppBar from 'material-ui/AppBar'
import {grey50} from 'material-ui/styles/colors';





import FlatButton from 'material-ui/FlatButton'
import FontAwesome from 'react-fontawesome' 

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import {withRouter} from 'react-router-dom'

import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card'


import SettingsButton from '../menu/settings-button.js'
class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      landing: true,
      loggedIn: this.props.loggedIn,
      openMenu: false,
    }
    this.titleRender = this.titleRender.bind(this)
  }

  componentWillMount() {
    console.log('this.props.history on the NAVBAR', this.props)
  }

  titleRender(){
    let {pathname} = this.props.location;
    if (pathname == "/settings"){
      return "Edit Profile"
    }
    return "Poller"
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
    return (
      <div className="login-box">
        <MuiThemeProvider>
          <AppBar
            title={"Poller"}
            style={{
              backgroundColor: '#000',
            }}
            titleStyle={{
              letterSpacing: '.2em',
              fontWeight: '800',
            }}
            showMenuIconButton={false}
            iconElementRight={<NavMenu color={grey50}/>}
          />
        </MuiThemeProvider>
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
//   profileUpdate: profile => dispatch(profileUpdate(profile)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))