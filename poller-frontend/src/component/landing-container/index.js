
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Auth0Lock from 'auth0-lock'
import {Route, Switch} from 'react-router-dom'

import HomePage from '../home-page'
import ProfileSettings from '../profile-settings'
import PollCreatePage from '../poll-create'
import PollLandingContainer from '../poll-landing-container'
import LoginPage from '../login'

import PrivateRoute from '../app/privateroute'

class LandingContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
   
  }

  componentWillMount() {
    console.log(this.props.history)
  }
  

  render() {
    console.log('this is the state and props on LANDING CONTAINER', this.state, this.props, this.context)
    return (
      <div>
        <NavBar/>
         <Switch>
          <Route  path="/settings" component={ProfileSettings} />
          <Route  path="/home" component={HomePage} />
          <Route path="/pollcreate" component={PollCreatePage}/>
          <Route path='/poll/:author_username/:created_at' component={PollLandingContainer}/>
        </Switch>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
    loggedIn: state.loggedIn
  })
  
  export const mapDispatchToProps = dispatch => ({

    
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer)