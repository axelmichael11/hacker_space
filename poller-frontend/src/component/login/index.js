import React from 'react'
import LandingContainer from '../landing-container'
import AuthLockButton from  '../auth0-lock'
class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
          <p> You need to log in first! </p>
        <AuthLock/>
      </div>
    )
  }
}

export default LoginPage