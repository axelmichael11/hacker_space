
import React from 'react'
import LandingContainer from '../landing-container'
import NavBar from '../nav-bar'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <NavBar/>
       <p> Welcome to Poller! </p>
      </div>
    )
  }
}

export default HomePage