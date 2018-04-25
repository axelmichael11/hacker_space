import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import Face from 'material-ui/svg-icons/action/face'
import SpeakerNotes from 'material-ui/svg-icons/action/speaker-notes'
import Assessment from 'material-ui/svg-icons/action/assessment'
import SwapVert from 'material-ui/svg-icons/action/swap-vert'

import FlatButton from 'material-ui/FlatButton';

import AuthLockButton from  '../auth0-lock'
import NavigateGettingStartedButton from '../getting-started-button'

import '../../style/index.scss'

const styles = {
  intro_container:{
    maxWidth: 450, 
    height:300,
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
    position: 'relative'
  }
}
class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.gettingStarted = this.gettingStarted.bind(this)
  }

  gettingStarted(){
  }

  render() {
    console.log('THIS>PROPS ON LOGIN PAGE', this.props)
    return (
      <div>
        <MuiThemeProvider>
          <Paper zdepth={2} style={styles.intro_container}>
            <p id="title">Poller</p>

            <div id="parent">
                <Face style={styles.middle_icon}/>
                <SpeakerNotes style={styles.middle_icon}/>
                <Assessment style={styles.middle_icon}/>
                <SwapVert style={styles.middle_icon}/>
            </div>


            <NavigateGettingStartedButton/>


          </Paper>
          <Paper zdepth={2} style={styles.login_container}>
            <AuthLockButton style={{margin: 15}}/>
          </Paper>
          </MuiThemeProvider>

      </div>
    )
  }
}

export default LoginPage