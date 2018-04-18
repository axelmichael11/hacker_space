import React from 'react'
import LandingContainer from '../landing-container'
import AuthLockButton from  '../auth0-lock'
class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log('THIS>PROPS ON LOGIN PAGE', this.props)
    return (
      <div>
          <p> You need to log in first! </p>
        <AuthLockButton history={this.props.history}/>
      </div>
    )
  }
}

export default LoginPage