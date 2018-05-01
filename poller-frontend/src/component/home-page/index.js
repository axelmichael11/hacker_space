
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Auth0Lock from 'auth0-lock'


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import {
    Step,
    Stepper,
    StepButton,
    StepContent,
  } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';

import LoginPage from '../login'
import SettingsButton from '../menu/settings-button.js'


class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentWillMount() {
    console.log(this.props.history)
  }

 


  render() {
    const {stepIndex} = this.state;    
    return (
        <div style={{maxWidth: 450, maxHeight: 600, margin: 'auto'}}>
        <MuiThemeProvider>
          <Paper style={{margin:'auto'}} zDepth={2}>
        
          </Paper>
        </MuiThemeProvider>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
    loggedIn: state.loggedIn
  })
  
  export const mapDispatchToProps = dispatch => ({

    
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(HomePage)