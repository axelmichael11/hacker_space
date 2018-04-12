//packages
import React from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


//Methods
import { storeUserProfile } from '../../action/user-profile-actions.js'
import { setAuth0Profile } from '../../action/auth0-actions.js'
import { login, logout } from '../../action/auth-actions.js'

import * as util from '../../lib/util.js'
//These will be used, to store id of the user in the database...
import {
  profileCreate,
    profileFetch,
} from '../../action/profile-actions.js'


import LoggedInMenu from '../menu/loggedin-menu'


//Style
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import AppBar from 'material-ui/AppBar'




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


import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card'

class LandingContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signUp: false,
      landing: true,
      loggedIn: localStorage.loggedIn ? true : false,
      openMenu: false,
    }
    this.logout = this.logout.bind(this)
    this.showLock = this.showLock.bind(this)
    this.handleOpenMenu = this.handleOpenMenu.bind(this)
    this.handleOnRequestChange = this.handleOnRequestChange.bind(this)
  }

  componentWillMount() {
    console.log(this.props.history)

    const options = {
      // oidcConformant: true,
      rememberLastLogin: true,
      auth: {
        audience: __AUTH0_AUDIENCE__,
        params: {
          scope: 'openid profile user_metadata email read:clients write:clients update:users_app_metadata update:users update:current_user_metadata', //need to research the scope parameter...
        },
      },
      theme: {
        primaryColor: '#E8660C',
      },
      languageDictionary: {
        title: 'Poller',
      },
    }

    this.lock = new Auth0Lock(
        __AUTH0_CLIENT_ID__,
        __AUTH0_CLIENT_DOMAIN__,
      options
    )

    this.lock.on('signup submit', () => {
      this.setState({ signUp: true })
    })

    this.lock.on('authenticated', authResult => {
      this.lock.getUserInfo(authResult.accessToken, (err, profile) => {
        if (err) return new Error('failed to authenticate');
        console.log('this IS THE PROFILE RESPONES',profile)
        this.props.setAuth0Profile(profile);
        this.props.login(authResult.accessToken); //sets token
        console.log('this.props',this.props);
        // this.props.profileFetch(authResult.)
        if (!this.props.auth0Profile.user_metadata) {
          console.log('HITTING PROFILE CREATE')
          this.props.profileCreate()
          .then((profile)=>{
            // this.props.setAuth0Profile(profile);
            this.props.history.push('/settings')
          })
          .catch(error=>console.error(error))
        }

        if (this.props.auth0Profile.user_metadata) {
          console.log('HITTING PROFILE CREATE')
          this.props.profileFetch()
          .then((profile)=>{
            this.props.setAuth0Profile(profile);
            this.props.history.push('/dashboard')
          })
          .catch(error=>console.error(error))
        }
      })
    })

    this.lock.on('signup submit', authResult => {
      this.lock.getUserInfo(authResult.accessToken, (err, profile) => {

      })
    })


  }

  showLock() {
    this.lock.show()
  }

  logout() {
    console.log('LOGGING OUT')
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('poller_token')
    localStorage.removeItem('reduxPersist:auth')
    //might need these later... need to research redux persist
    localStorage.removeItem('reduxPersist:userId')
    localStorage.removeItem('reduxPersist:profile')
    localStorage.removeItem('reduxPersist:userInfo')
    this.lock.logout()
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
    console.log('LANDING CONTAINER', this.state, this.props)
    return (
      <div className="login-box">
        <MuiThemeProvider>
          <AppBar
            title="Poller"
            style={{
              backgroundColor: '#E8660C',
            }}
            titleStyle={{
              letterSpacing: '.2em',
              fontWeight: '800',
            }}
            iconElementRight={
              this.state.loggedIn ?
              <LoggedInMenu logout={this.logout}/> :
              <p> not logged in </p>
            }
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          {!this.state.loggedIn ?
           <RaisedButton
            onClick={this.showLock}
            label={'Login'}
            style={{ marginTop: '4px', marginRight: '10px' }}
          /> :
          null
          }
        </MuiThemeProvider>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  auth0Profile: state.auth0Profile
})

export const mapDispatchToProps = dispatch => ({
  setAuth0Profile: (profile) => dispatch(setAuth0Profile(profile)),
  login: token => dispatch(login(token)),
  logout: () => dispatch(logout()),
  profileCreate: () => dispatch(profileCreate()),
  profileFetch: () => dispatch(profileFetch()),
//   profileUpdate: profile => dispatch(profileUpdate(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer)