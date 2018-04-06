import React from 'react'

import { Route, BrowserRouter } from 'react-router-dom'
import LandingContainer from '../landing-container'
import DashboardContainer from '../dashboard-container'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={DashboardContainer} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App