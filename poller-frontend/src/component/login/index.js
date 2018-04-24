import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import Face from 'material-ui/svg-icons/action/face'
import AuthLockButton from  '../auth0-lock'
require('./style.scss')

const styles = {
  intro_container:{
    maxWidth: 450, 
    margin: 'auto',
    marginBottom:20
  },
  login_container:{
    maxWidth: 450, 
    margin: 'auto'
  },
  middle_icon: {
    display:'center',
    margin:'auto',
    width: 50,
    height: 50,
    textAlign: 'center',
    position: 'center'
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
          <Paper zdepth={2} style={styles.intro_container}>
            <div id="parent" >
              <div id="child" style={styles.middle_icon}>
                <Face style={styles.middle_icon}/>
              </div>
            </div>
          </Paper>
          <Paper zdepth={2} style={styles.login_container}>
            <AuthLockButton/>
          </Paper>
          </MuiThemeProvider>

      </div>
    )
  }
}

export default LoginPage