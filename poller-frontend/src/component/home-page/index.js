
import React from 'react'
import LandingContainer from '../landing-container'
import NavBar from '../nav-bar'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log('this.props on HOMEPAGE', this.props.history)
    return (
      <div>
        <NavBar history={this.props.history}/>
       <p> Welcome to Poller! </p>
      </div>
    )
  }
}

export default HomePage