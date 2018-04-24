import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import Face from 'material-ui/svg-icons/action/face'
import AuthLockButton from  '../auth0-lock'

const styles = {
  middle_icon: {
    margin:'auto'
  }
}
class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log('THIS>PROPS ON LOGIN PAGE', this.props)
    return (
      <div>
        <MuiThemeProvider>
          <Paper zdepth={2}>
            <Face style={styles.middle_icon}/>
          </Paper>
          <Paper zdepth={2}>
            <AuthLockButton/>
          </Paper>
          </MuiThemeProvider>

      </div>
    )
  }
}

export default LoginPage