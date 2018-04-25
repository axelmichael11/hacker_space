
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Auth0Lock from 'auth0-lock'


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'



import {
    Step,
    Stepper,
    StepButton,
    StepContent,
  } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


import LoginPage from '../login'
import SettingsButton from '../menu/settings-button.js'


class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        stepIndex: 0,
    }
   this.handleNext = this.handleNext.bind(this)
   this.handlePrev = this.handlePrev.bind(this)
   this.renderStepActions = this.renderStepActions.bind(this)
  }

  componentWillMount() {
    console.log(this.props.history)
  }
  

  handleNext() {
    const {stepIndex} = this.state;
    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Next"
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
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