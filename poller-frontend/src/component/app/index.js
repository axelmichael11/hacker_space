import React from 'react'
import { connect } from 'react-redux'
import { Route, BrowserRouter } from 'react-router-dom'
import LandingContainer from '../landing-container'
import DashboardContainer from '../dashboard-container'
import ProfileSettings from '../profile-settings'
import {
  profileFetch,
} from '../../action/profile-actions.js'

import {storeUserProfile} from '../../action/user-profile-actions'
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: this.props.loggedIn
    }
  }
  componentWillMount(){
  }

  render() {
    console.log('this.props on the app',this.props)
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={LandingContainer} />
            <Route exact path="/dashboard" component={DashboardContainer} />
            <Route exact path="/settings" component={ProfileSettings}/>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  
})

export const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(App)