
import React from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import {
    profileFetch,
} from '../../action/profile-actions.js'
import {
    storageLoginAttempt,
} from '../../action/storage-login-attempt.js'
import {setAuthToken} from '../../action/auth0-actions.js'
import { login, logout } from '../../action/auth-actions.js'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton';
import { FlatButton } from 'material-ui';

class NavigateGettingStartedButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.navigateGettingStartedPage = this.navigateGettingStartedPage.bind(this)
    this.navigateLoginPage = this.navigateLoginPage.bind(this)
  }

  componentWillMount() {
    console.log('this.props ON GETTINGS STARTED BUTTON',this.props)
  }

  navigateGettingStartedPage(){
      this.props.history.push('/gettingstarted')
  }

  navigateLoginPage(){

  }

  render() {
      console.log('AUTH LOCK PAGE', this.state, this.props)
    return (
      <div>
        <MuiThemeProvider>
           <FlatButton
            onClick={this.navigateGettingStartedPage}
            label={"What is this?"}
            style={{ marginTop: '4px', marginRight: '10px', fontFamily:'Play' }}
          /> 
        </MuiThemeProvider>

      </div>
    )
  }
}
export const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    userProfile: state.userProfile,
  })
  
  export const mapDispatchToProps = dispatch => ({
  })
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigateGettingStartedButton))