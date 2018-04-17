import React from 'react'
import { connect } from 'react-redux'
import Auth0Lock from 'auth0-lock'

import { Route, BrowserRouter } from 'react-router-dom'
import LandingContainer from '../landing-container'
import DashboardContainer from '../dashboard-container'
import ProfileSettings from '../profile-settings'
import LoginPage from '../login'


import {
  profileFetch,
} from '../../action/profile-actions.js'

import {storageLogin} from '../../action/storage-login-attempt'

import PrivateRoute from './privateroute.js'
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: this.props.loggedIn
    }
    this.checkAuthorization = this.checkAuthorization.bind(this)
    this.showLock = this.showLock.bind(this)
  }

  componentWillMount(){
    // this.checkAuthorization();
    const options = {
      sso: true,
      oidcConformant: true, //this determines METADATA is returned in scope...
      rememberLastLogin: true,
      auth: {
        audience: __AUTH0_AUDIENCE__,
        params: {
          scope: 'openid profile userId update:users_app_metadata openid email profile read:clients write:clients update:users_app_metadata update:users update:current_user_metadata', //need to research the scope parameter...
        },
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

    this.lock.on('authenticated', authResult => {
      if (!authResult) return new Error('failed to authenticate');
        console.log('this IS THE accesstoken',authResult.accessToken)
        this.props.setAuthToken(authResult.accessToken)
        this.props.profileFetch()
        .then((profile)=>{
          this.props.history.push('/settings');
        })
        .catch(err=>console.log('ERROR, failure to create or retrieve profile...',err))
    })
  }

  showLock() {
    this.lock.show()
  }


  checkAuthorization(){
    if (localStorage.poller_token && !this.props.loggedIn && !this.props.storageLoginAttempt){
      this.props.profileFetch().then(()=>this.props.storageLogin())
    }
  }

  render() {
    console.log('this.props on the app',this.props)
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Route exact path="/login" component={LoginPage} hello={this.lock}/>
            <PrivateRoute loggedIn={this.props.loggedIn} props={this.showlock} lock={this.lock} path="/" component={LandingContainer} />
            <PrivateRoute loggedIn={this.props.loggedIn} props={this.showlock} lock={this.lock} path="/dashboard" component={DashboardContainer} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  storageLoginAttempt: state.storageLoginAttempt
})

export const mapDispatchToProps = dispatch => ({
  profileFetch: ()=>dispatch(profileFetch()),
  storageLogin:()=>dispatch(storageLogin())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)