import React from 'react'

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


import AuthLockButton from  '../auth0-lock'



const styles = {
  signup_bar:{
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
    position: 'relative'
  }
}
class GettingStartedPage extends React.Component {
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
        {step < 2 && (
            <RaisedButton
            label="OK"
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onClick={this.handleNext}
            style={{marginRight: 12}}
          />
        )}
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
      console.log('this.state on getting STARTED PAGE', this.state, this.props)
      return (
          <div style={{maxWidth: 450, maxHeight: 600, margin: 'auto'}}>
          <MuiThemeProvider>
          <p id="sub-title">Welcome to Poller!</p>
              <Paper style={{margin:'auto'}} zDepth={2}>
          <Stepper
            activeStep={stepIndex}
            linear={false}
            orientation="vertical"
          >
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 0})}>
                <p id="text">Welcome...</p>
              </StepButton>
              <StepContent>
                <p id="text">
                  This is Poller, a web application to see what people are thinking! ;)
                  Ever wanted to post questions anonymously and get public feedback?
                  Is bigfoot real? Is Donald Trump's hair? Poller is an application that
                  allows users to post yes or no questions and see how people are voting 
                  anonymously. If you want to make the poll more interesting, you can submit
                  demographic information about yourself to be factored into the result! 
                  (Not required). ALSO! The catch is, you have to vote to see the results. :)

                </p>
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 1})}>
              <p id="text">Create an Account, customize your profile</p>
              </StepButton>
              <StepContent>
              <p id="text">
                  You have to create an account. This application uses Oauth... That 
                  means this web application or server does NOT store sensitive information.
                  Username, email, password is stored using 0-Auth services.
                  Once you sign up you can then submit your demographic information to make
                  this interesting! (Again, not required...)
                </p>
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 2})}>
              <p id="text">Post questions and vote!</p>
              </StepButton>
              <StepContent>
                <p id="text">
                  Once your profile is set up, you can see other people's questions to vote on,
                  or post your own questions to see what other users are thinking!
                  For storage purposes, you are only allowed up to three questions for one account.
                  Sign up Here!
                  <AuthLockButton/>
                </p>
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
          </Stepper>
          </Paper>
          </MuiThemeProvider>
        </div>
      )
    }
  }

export default GettingStartedPage