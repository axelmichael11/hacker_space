import React from 'react'
import { connect } from 'react-redux'
// import { checkProfileExists } from '../../action/profile-actions.js'
import {compose} from 'recompose'

import {
  pollsFetch,
  pollDelete,
  pollSend,
  } from '../../action/user-polls-actions.js'
  
  
  import classnames from 'classnames';
  import PropTypes from 'prop-types';


  import Button from '@material-ui/core/Button';
  import { withStyles } from '@material-ui/core/styles';
  import Dialog from '@material-ui/core/Dialog';
  import DialogActions from '@material-ui/core/DialogActions';
  import DialogContent from '@material-ui/core/DialogContent';
  import DialogContentText from '@material-ui/core/DialogContentText';
  
  import DialogTitle from '@material-ui/core/DialogTitle';
  import InputLabel from '@material-ui/core/InputLabel';
  import Input from '@material-ui/core/Input';
  import MenuItem from '@material-ui/core/MenuItem';
  import FormControl from '@material-ui/core/FormControl';
  import Select from '@material-ui/core/Select';
  import Divider from '@material-ui/core/Divider';
  import Paper from '@material-ui/core/Paper';
  import Typography from '@material-ui/core/Typography';
  import Checkbox from '@material-ui/core/Checkbox';
  import Card from '@material-ui/core/Card';
  import CardActions from '@material-ui/core/CardActions';
  import CardContent from '@material-ui/core/CardContent';
  import CardHeader from '@material-ui/core/CardHeader';
  import CardMedia from '@material-ui/core/CardMedia';
  import MenuList from '@material-ui/core/MenuList';
  import Snackbar from '@material-ui/core/Snackbar';
  import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
  import IconButton from '@material-ui/core/IconButton';
  import Collapse from '@material-ui/core/Collapse';
  import MoreVertIcon from '@material-ui/icons/MoreVert';
  import Avatar from '@material-ui/core/Avatar';
  import TextField from '@material-ui/core/TextField';
  import Toolbar from '@material-ui/core/Toolbar';
  import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import UserPollCard from '../user-poll-card'
import LoadingHOC from '../loading'
import {MyPolls} from '../my-polls'



const SubmitButton = ({...props}) =>{
  return (
    <div className={props.classes.buttonContainer}>
      <Button 
      variant="outlined"
      onClick={props.submitClick} 
      className={props.classes.button}
      >
      {props.buttonTitle}
      </Button>
    </div>
  )
}



const FeedBackSubmitButton = LoadingHOC(SubmitButton)
const FeedBackMyPolls = LoadingHOC(MyPolls);


  const styles = theme => ({
    container: theme.overrides.MuiPaper,
    ageSelect:{
      marginLeft: 15,
    },
    buttonContainer: theme.overrides.MuiButton.root.container,
    button: theme.overrides.MuiButton.root.button,
   
    text: theme.typography.text,
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    actions: {
      display: 'flex',
    },
    cardHeader:theme.overrides.PollCard.cardHeader,
    cardContent:theme.overrides.PollCard.cardContent,
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    pollActions: theme.overrides.PollCard.pollActions,
  });




class PollCreatePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        pollSubject: '',
        subjectError: false,
        subjectErrorText: 'Max Subject Length Reached',
        pollQuestion:'',
        questionError:false,
        questionErrorText: "Max Question Length Reached",
        openSubjectValidationError: false,
        subjectValidationErrorMessage: 'Your Subject is too short!',
        openQuestionValidationError:false,
        questionValidationErrorMessage: 'That can\'t be a question, it is too short!',
        maxPollReachedMessage:'You already have three questions! That is the limit...',
        snackBarDuration: 5000,
        openPollCreateSuccess:false,
        pollCreateSuccessMessage:'Poll has been created!',
        openPollDeleteSuccess:false,
        pollDeleteSuccessMessage:'Poll has been deleted!',
        unknownErrorMessage:'Unknown Error has Occurred...',
        pollDeleteAlert: false,
        pollToDelete: null,
        helpExpanded:false,
        unknownError: false,
        //loading
        pollCreateLoad:false,
        MyPollsLoad:false,
        pollDeleteLoad:false,

    }
  this.handleHelpExpand = this.handleHelpExpand.bind(this)
   this.handlePollSubmitCreate = this.handlePollSubmitCreate.bind(this)
   //input changes
   this.handleSubjectChange = this.handleSubjectChange.bind(this)
   this.handleQuestionChange = this.handleQuestionChange.bind(this)

   //error changes
   this.handleSubjectValidationError = this.handleSubjectValidationError.bind(this)
   this.handleQuestionValidationError = this.handleQuestionValidationError.bind(this)
   this.handlePollCreateSuccess = this.handlePollCreateSuccess.bind(this)
   this.handlePollClear = this.handlePollClear.bind(this)
   this.handleMaxPollReached = this.handleMaxPollReached.bind(this)
   this.handleUnknownError = this.handleUnknownError.bind(this)
   this.handlePollDeleteSuccess = this.handlePollDeleteSuccess.bind(this)
   this.handlePollDeleteAlertOpen = this.handlePollDeleteAlertOpen.bind(this)
   this.handlePollDeleteAlertClose = this.handlePollDeleteAlertClose.bind(this)

   this.handleSubmitPollDelete = this.handleSubmitPollDelete.bind(this)
  }

  componentWillMount() {
    this.setState({MyPollsLoad:true})
    this.props.pollsFetch()
    .then(res => {
      this.setState({MyPollsLoad:false})
  })
  .catch(err => {
    this.setState({MyPollsLoad:false})
  })
    console.log(this.props.history)
  }

  handleSubjectChange(e){
      if (e.target.value.length < 25){
        this.setState({pollSubject: e.target.value, subjectError:false})
      }else {
        this.setState({subjectError:true})
      }
  }

  handleQuestionChange(e){
    if (e.target.value.length < 150){
      this.setState({pollQuestion: e.target.value, questionError:false})
    }else {
      this.setState({questionError:true})
    }
  }

  handleSubjectValidationError(){
    this.setState((oldState)=>{
      return {
        openSubjectValidationError: !oldState.openSubjectValidationError,
      }
    });
  }

  handleQuestionValidationError(){
    this.setState((oldState)=>{
      return {
        openQuestionValidationError: !oldState.openQuestionValidationError,
      }
    });
  }

  handlePollCreateSuccess(){
    this.setState((oldState)=>{
        return {
          openPollCreateSuccess: !oldState.openPollCreateSuccess,
        }
      });
  }

  handleMaxPollReached(){
    this.setState((oldState)=>{
      return {
        openMaxPollReached: !oldState.openMaxPollReached,
      }
    });
  }
  handlePollDeleteSuccess(){
    this.setState((oldState)=>{
      return {
        openPollDeleteSuccess: !oldState.openPollDeleteSuccess,
      }
    });
  }

  handlePollClear(){
    this.setState({
          pollSubject: '',
          pollQuestion:'',
        });
  }

  handlePollDeleteAlertOpen(poll){
    this.setState({
      pollDeleteAlert: !this.state.pollDeleteAlert,
      pollToDelete: poll
    });
  };

  handlePollDeleteAlertClose(){
    this.setState({
      pollDeleteLoad:false,  
      pollDeleteAlert:false, 
      pollToDelete:null})
  };



  handleHelpExpand(){
    this.setState({ helpExpanded: !this.state.helpExpanded });
  }


  handleSubmitPollDelete(){
    this.setState({pollDeleteLoad:true})
    this.props.pollDelete(this.state.pollToDelete)
    .then((res)=>{
      console.log('this is the response', res)

      this.handlePollDeleteAlertClose()
  })
  .catch(err=>{
    let status = err.toString().slice(-3)
    console.log('this is the error 2 ', )
    if (status.includes('401')){
      console.log('401 error ', )
      this.handlePollDeleteAlertClose()
    }
    if (status.includes('501')){
      console.log('501 error ', )
      this.handlePollDeleteAlertClose()

    } else {
      console.log('other error ', )
      this.handlePollDeleteAlertClose()

    }
  })

  }
  

  handlePollSubmitCreate(){
      let {pollSubject, pollQuestion} = this.state
      let {nickname} = this.props.userProfile
      let poll = Object.assign({}, {pollSubject, pollQuestion, nickname})
      console.log('this is the poll', poll)
      if (poll.pollSubject.length < 5){
          this.handleSubjectValidationError();
          return;
      }
      
      if (poll.pollQuestion.length < 10){
          this.handleQuestionValidationError();
          return;
      }
      this.setState({pollCreateLoad:true})
      this.props.pollSend(poll)
      .then((res)=>{
          console.log('this is the response', res)
          this.handlePollClear()
          this.handlePollCreateSuccess()
          this.setState({pollCreateLoad:false, pollDeleteAlert:false})
      })
      .catch(err=>{
        let status = err.toString().slice(-3)
        console.log('this is the error 2 ', )
        if (status.includes('550')){
          this.handleMaxPollReached();
        } else {
          this.handleUnknownError();
          this.setState({pollCreateLoad:false,  pollDeleteAlert:false})
        }
      })
  }

  handleUnknownError(){
    this.setState((oldState)=>{
      return {
        unknownError: !oldState.unknownError,
      }
    });
  }


  render() {
    const {classes, theme} = this.props

    console.log('this is the poll create page state', this.state, this.props)
    return (
        <div>
          <Dialog
            open={this.state.pollDeleteAlert}
            modal={false}
        >
          <DialogTitle id="alert-dialog-title">"Are you sure?"</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this poll? You cannot undo this.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <div className={classes.container}>
            <Button 
              onClick={this.handlePollDeleteAlertOpen} 
              className={classes.button}
            >
              Cancel
            </Button>
            </div>
            <div className={classes.container}>

            <FeedBackSubmitButton
                classes={classes}
                submitClick={this.handleSubmitPollDelete}
                buttonTitle={'Delete Poll'}
                Loading={this.state.pollDeleteLoad}
              />
            </div>
          </DialogActions>
        </Dialog>
          
          <Paper className={classes.container}>
          <Card>
            <CardActions 
              disableActionSpacing
              onClick={this.handleHelpExpand}
            >
                <Typography className={classes.text}>
                  Help
                </Typography>
                
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.helpExpanded,
                  })}
                  // onClick={this.handleExpandClick}
                  aria-expanded={this.state.helpExpanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
            <Collapse in={this.state.helpExpanded} timeout="auto" unmountOnExit>
              <CardContent>
                  <Typography className={classes.text}>
                Update your profile information if you want this information to be anonomysously submitted when
                  answering questions! None of these fields are required,
                  and no demographic information specific to you is shown in the results of a poll.
                  These can be updated as often as necessary. Why not make this app a little more interesting?
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Paper>

        <Paper className={classes.container}>
        <Card>
          <CardContent className={classes.cardHeader}>
                <Typography variant="headline" component="h1" className={classes.cardHeader}>
                    Poll Create
                </Typography>
            </CardContent>
            <Divider/>
            <CardContent className={classes.cardContent}>
              <Toolbar className={classes.cardContent}>
                <Typography variant="subheading" component="h3" style={{marginRight:15}}>
                    Subject
                </Typography>
                <FormControl fullWidth>
                  <InputLabel >{this.state.subjectError ? this.state.subjectErrorText : "Subject"}</InputLabel>
                  <Input
                    // error={this.state.subjectError}
                    // label={this.state.subjectError ? this.state.subjectErrorText : null}
                    multiline={true}
                    id="adornment-amount"
                    value={this.state.pollSubject}
                    onChange={this.handleSubjectChange}
                  />
                </FormControl>
              </Toolbar>
            </CardContent>
            <Divider/>
            <CardContent className={classes.cardContent}>
              <Toolbar className={classes.cardContent}>
                <Typography variant="subheading" component="h3" style={{marginRight:15}}>
                    Question
                </Typography>
                <FormControl fullWidth>
                  <InputLabel >{this.state.questionError ? this.state.questionErrorText : "Question"}</InputLabel>
                  <Input
                    // error={this.state.questionError}
                    // label={this.state.subjectError ? this.state.subjectErrorText : null}
                    multiline={true}
                    id="adornment-amount"
                    value={this.state.pollQuestion}
                    onChange={this.handleQuestionChange}
                    rows={6}
                    rowsMax="6"

                  />
                </FormControl>
              </Toolbar>
            </CardContent>
            <CardContent className={classes.container}>
              <FeedBackSubmitButton
                classes={classes}
                submitClick={this.handlePollSubmitCreate}
                buttonTitle={'Create Poll'}
                Loading={this.state.pollCreateLoad}
              />
            </CardContent>
          </Card>
        </Paper>
        <Paper className={classes.container}>
          <CardContent className={classes.cardHeader}>
            <Typography variant="headline" component="h1" className={classes.cardHeader}>
              My Polls
            </Typography>
          </CardContent>
          <Divider/>
          <div className="list">
            <FeedBackMyPolls
            Loading={this.state.MyPollsLoad}
            userPolls={this.props.userPolls}
            classes={classes}
            handlePollDeleteAlertOpen={this.handlePollDeleteAlertOpen}
            />
          </div>
        </Paper>


         <Snackbar
          open={this.state.openSubjectValidationError}
          message={this.state.subjectValidationErrorMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handleSubjectValidationError}
        />

         <Snackbar
          open={this.state.openQuestionValidationError}
          message={this.state.questionValidationErrorMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handleQuestionValidationError}
        />

         <Snackbar
          open={this.state.openPollCreateSuccess}
          message={this.state.pollCreateSuccessMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handlePollCreateSuccess}
        />
        <Snackbar
          open={this.state.openMaxPollReached}
          message={this.state.maxPollReachedMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handleMaxPollReached}
        />
        <Snackbar
          open={this.state.openPollDeleteSuccess}
          message={this.state.pollDeleteSuccessMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handlePollDeleteSuccess}
        />
        <Snackbar
          open={this.state.unknownError}
          message={this.state.unknownErrorMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handleUnknownError}
        />
      </div>
    )
  }
}

export const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    userProfile: state.userProfile,
    userPolls: state.userPolls,
    Loading: state.Loading
  })
  
  export const mapDispatchToProps = dispatch => ({
    pollSend: (poll)=> dispatch(pollSend(poll)),
    pollsFetch: () => dispatch(pollsFetch()),
    pollDelete: (poll)=> dispatch(pollDelete(poll))
  })
  
  // export default connect(mapStateToProps, mapDispatchToProps)(PollCreatePage)
  PollCreatePage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };  

  export default compose(
    withStyles(styles, {withTheme:true}),
    connect(mapStateToProps, mapDispatchToProps)
  )(PollCreatePage)