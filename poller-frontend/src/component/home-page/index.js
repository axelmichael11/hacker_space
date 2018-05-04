
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
import MaterialStyles from '../../style/material-ui-style'
import AppBar from 'material-ui/AppBar'


import {getPublicPolls} from '../../action/public-poll-actions.js'
import LoginPage from '../login'
import SettingsButton from '../menu/settings-button.js'


class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      polls: this.props.publicPolls
    }
    this.renderPoll = this.renderPoll.bind(this)
  }

  componentWillMount() {
    console.log(this.props.history)
    this.props.getPublicPolls()
  }

  renderPoll(poll){
    return (
      <Card 
        style={{margin:15}}
        >
        <AppBar
          title={poll.author_id}
          showMenuIconButton={false}
          />}
        />
        <CardText style={{whiteSpace: 'normal'}}>
          {poll.subject}
        </CardText>
        <CardText style={{whiteSpace: 'normal'}}>
          {poll.question}
        </CardText>
    </Card>
    )
  }

 


  render() {
    const {stepIndex} = this.state;    
    return (
        <div style={{maxWidth: 450, maxHeight: 600, margin: 'auto'}}>
        <MuiThemeProvider>
          <Paper style={{margin:'auto'}} zDepth={2}>
          <Card>
            <CardText style={MaterialStyles.title}> Explore </CardText>
          {
            this.state.polls.map((poll)=>{
            return this.renderPoll(poll)
            })
          }
          </Card>
          </Paper>
        </MuiThemeProvider>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    publicPolls: state.publicPolls
  })
  
  export const mapDispatchToProps = dispatch => ({
    getPublicPolls:()=>dispatch(getPublicPolls())
    
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(HomePage)