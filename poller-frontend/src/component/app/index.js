import React from 'react'

import { Route, BrowserRouter } from 'react-router-dom'
import LandingContainer from '../landing-container'
import DashboardContainer from '../dashboard-container'
import ProfileSettings from '../profile-settings'

class App extends React.Component {
  render() {
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

export default App