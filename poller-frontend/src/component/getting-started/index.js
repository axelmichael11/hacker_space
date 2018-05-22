
import React from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom'
import {compose} from 'recompose'
import MaterialStyles from '../../style/material-ui-style'
import { withStyles } from '@material-ui/core/styles';


import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AuthLockButton from  '../auth0-lock'

function getSteps() {
  return ['Welcome...', 'Create an Account, customize your profile', 'Post questions and vote!'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return ` This is Poller, a web application to see what people are thinking! ;)
              Ever wanted to post questions anonymously and get public feedback?
              Is bigfoot real? Is Donald Trump's hair? Poller is an application that
              allows users to post yes or no questions and see how people are voting 
              anonymously. If you want to make the poll more interesting, you can submit
              demographic information about yourself to be factored into the result! 
              (Not required). ALSO! The catch is, you have to vote to see the results. :)`;
    case 1:
      return `You have to create an account. This application uses Oauth... That 
              means this web application or server does NOT store sensitive information.
              Username, email, password is stored using 0-Auth services.
              Once you sign up you can then submit your demographic information to make
              this interesting! (Again, not required...)`;
    case 2:
      return ` Once your profile is set up, you can see other people's questions to vote on,
              or post your own questions to see what other users are thinking!
              For storage purposes, you are only allowed up to three questions for one account.
              Sign up Here!`;
    default:
      return 'Unknown step';
  }
}

class GettingStartedPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep:0,
    }
    this.handleNext = this.handleNext.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.renderBackButton = this.renderBackButton.bind(this)
  }

  handleNext (){
    this.setState((oldState)=>{
      return {
        activeStep: oldState.activeStep + 1,
      }
    });
  };

  handleBack () {
    this.setState((oldState)=>{
      return {
        activeStep: oldState.activeStep - 1,
      }
    });
  };

  handleReset() {
    this.setState({
      activeStep: 0,
    });
  };

  renderBackButton(){
    let {classes} = this.props
    let {activeStep} = this.state
    return (
      this.state.activeStep > 0 ?
          <Button
          disabled={activeStep === 0}
          onClick={this.handleBack}
          className={classes.getting_started_page.button}
        >
          Back
        </Button> :
          null
    )
  }

  renderNextButton(){
    let {classes} = this.props
    let {activeStep} = this.state
    return (
      this.state.activeStep > 0 ?
          <Button
          disabled={activeStep === 0}
          onClick={this.handle}
          className={classes.getting_started_page.button}
        >
          Back
        </Button> :
          null
    )
  }
  
  
    render() {
      const {classes} = this.props;    
      const steps = getSteps();
      const { activeStep } = this.state;
      console.log('this.state on getting STARTED PAGE', this.state, this.props)
      return (
        <div>
        <Typography className={classes.title} color="primary">
            Welcome to Poller
          </Typography>
        <Stepper activeStep={activeStep} alternativeLabel nonLinear>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <div className={classes.getting_started_page.actionsContainer}>
                  {this.renderBackButton()}
                  {this.renderNextButton()}


                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.container_paper.root}>
            <Typography className={classes.text}>Thats all there is to it! Sign Up Below... </Typography>
            <div className={classes.getting_started_page.button}>
            <Button onClick={this.handleReset} className={classes.getting_started_page.button}>
              I want to read this again
            </Button>
            </div>
          </Paper>
        )}
        <Paper square elevation={0} className={classes.container_paper.root}>
          <Typography className={classes.text}>
              {getStepContent(this.state.activeStep)}
          </Typography>
        </Paper>
        <Paper square elevation={0} className={classes.container_paper.root}>
            <Typography className={classes.text}>Sign Up Below...</Typography>
            <AuthLockButton/>
          </Paper>
      </div>
      )
    }
  }


  
export const mapStateToProps = state => ({
    loggedIn: state.loggedIn
  })
  
  export const mapDispatchToProps = dispatch => ({
  })
 
  GettingStartedPage.propTypes = {
    classes: PropTypes.object,
  };

  
  export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(MaterialStyles),
  )(GettingStartedPage)