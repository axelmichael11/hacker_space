//packages
import React from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


//Methods
// import { storeId } from '../../action/user-id-actions.js'
import { login, logout } from '../../action/auth-actions.js'
import * as util from '../../lib/util.js'
//These will be used, to store id of the user in the database...
// import {
//   profileUpdate,
//   profileFetchRequest,
// } from '../../action/profile-actions.js'

//Style
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import AppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import FontAwesome from 'react-fontawesome' 

import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import { GridList, GridTile } from 'material-ui/GridList'

class LandingContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signUp: false,
      landing: true,
      loggedIn: localStorage.loggedIn ? true : false,
    }
    this.logout = this.logout.bind(this)
    this.showLock = this.showLock.bind(this)
  }

  componentWillMount() {
    // console.log(this.props.history)

    const options = {
      oidcConformant: true,
      auth: {
        audience: __AUTH0_AUDIENCE__,
        params: {
          scope: 'openid profile ', //need to research the scope parameter...
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
        if (err) return new Error('failed to authenticate')
        // console.log('profile!!!!!!', profile.sub)
        // this.props.storeId(profile.sub)
        this.props.login(authResult.accessToken)
        // this.props.profileFetch()
        // localStorage.setItem('loggedIn', true)
        // localStorage.setItem('userInfo', JSON.stringify(profile))
        // this.state.signUp
        //   ? this.props.history.push('/settings')
        //   : this.props.history.push('/dashboard')
      })
    })
  }

  showLock() {
    this.lock.show()
  }

  logout() {
    // localStorage.removeItem('loggedIn')
    localStorage.removeItem('poller_token')
    // localStorage.removeItem('reduxPersist:auth')
    //might need these later... need to research redux persist
    // localStorage.removeItem('reduxPersist:userId')
    // localStorage.removeItem('reduxPersist:profile')
    // localStorage.removeItem('reduxPersist:listings')
    this.lock.logout()
  }

  render() {
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
            iconElementLeft={
                    <FontAwesome
                        className="bar-chart"
                        name="bar-chart"
                        size="2x"
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
            }
                
          />
        </MuiThemeProvider>
        <div>
          <MuiThemeProvider>
          <RaisedButton
                onClick={this.state.loggedIn ? this.logout : this.showLock}
                label={this.state.loggedIn ? 'Logout' : 'Login'}
                style={{ marginTop: '4px', marginRight: '10px' }}
              />
        </MuiThemeProvider>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = state => ({})

export const mapDispatchToProps = dispatch => ({
//   logout: () => dispatch(logout()),
//   storeId: id => dispatch(storeId(id)),
//   login: token => dispatch(login(token)),
//   profileFetch: () => dispatch(profileFetchRequest()),
//   profileUpdate: profile => dispatch(profileUpdate(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer)