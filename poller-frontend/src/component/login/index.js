import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'


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
        <AuthLockButton/>
      </div>
    )
  }
}

export default LoginPage