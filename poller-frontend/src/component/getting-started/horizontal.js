import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import {compose} from 'recompose'

import Paper from '@material-ui/core/Paper';
import StepLabel from '@material-ui/core/StepLabel';
import MaterialStyles from '../../style/material-ui-style'

import AuthLockButton from  '../auth0-lock'


import MobileStepper from '@material-ui/core/MobileStepper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import welcomePhoto from '../../lib/welcome.jpg'
import profilePhoto from '../../lib/profile.jpg'
import votePhoto from '../../lib/vote.jpg'

const tutorialSteps = [
  {
    photo: welcomePhoto,
    label: 'Welcome To Poller',
    description: ` This is Poller, a web application to see what people are thinking! ;)
                    Ever wanted to post questions anonymously and get public feedback?
                    Is bigfoot real? Is Donald Trump's hair? Poller is an application that
                    allows users to post yes or no questions and see how people are voting 
                    anonymously. If you want to make the poll more interesting, you can submit
                    demographic information about yourself to be factored into the result! 
                    (Not required). ALSO! The catch is, you have to vote to see the results. :)`,
  },
  {
    photo: profilePhoto,
    label: 'Create an Account, customize your profile',
    description: `You have to create an account. This application uses Oauth... That 
                    means this web application or server does NOT store sensitive information.
                    Username, email, password is stored using 0-Auth services.
                    Once you sign up you can then submit your demographic information to make
                    this interesting! (Again, not required...)`,
  },
  {
    photo: votePhoto,
    label: 'Post questions and vote!',
    description: ` Once your profile is set up, you can see other people's questions to vote on,
                    or post your own questions to see what other users are thinking!
                    For storage purposes, you are only allowed up to three questions for one account.
                    Sign up Here!`,
  },
];

const styles = theme => ({
  container: theme.overrides.MuiPaper,
  containerDiv: theme.overrides.MuiPaper.root,

  headingText:{
    backgroundColor:theme.palette.primaryColor,
    color: theme.palette.primary.secondaryColor,
    fontFamily: theme.typography.fontFamily,
    textAlign:'center',
    margin:25,
  },
  footingText:{
    color: theme.palette.primary.contrastText,
    fontFamily: theme.typography.fontFamily,
    fontSize:15
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit * 2,
    marginBottom: 10,
    backgroundColor: theme.palette.primary.main,
  },
  bodyText:{
    margin:35,

  },
  button: theme.overrides.MuiButton
});

class GettingStartedPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          activeStep:0,
        }
        this.handleNext = this.handleNext.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleStepChange = this.handleStepChange.bind(this)
      }

  handleNext (){
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack (){
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange (activeStep) {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.containerDiv}>
        <div >
        <Paper square elevation={2} className={classes.container}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map((step, key) => {
            return (
              <div key={key}>
                <Typography variant="display2" className={classes.headingText}> {step.label} </Typography>
                <img src={step.photo} width={'250px'} style={{display:'block', margin:'auto'}}/>
                <Typography variant="subheading" className={classes.bodyText}>{step.description}</Typography>
              </div>
            )
          })
          }
        </SwipeableViews>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.button}
          style={{backgroundColor:'white'}}
          nextButton={
            <Button size="small" className={classes.button} onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small"  className={classes.button} onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              
            </Button>
          }
        />
        </Paper>
      </div>
      <AuthLockButton style={{margin: 15}}/>
    </div>
    );
  }
}

GettingStartedPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

  
  export default compose(
    withRouter,
    withStyles(styles, { withTheme: true }),
  )(GettingStartedPage)