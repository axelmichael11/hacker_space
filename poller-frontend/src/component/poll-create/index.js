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


const FeedBackMyPolls = LoadingHOC(MyPolls);

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
  

  const styles = theme => ({
    container: theme.overrides.MuiPaper,
    ageSelect:{
      marginLeft: 15,
    },
    buttonContainer: theme.overrides.MuiButton.root.container,
    button: theme.overrides.MuiButton.root.button,
    cardStack:{
      backgroundColor: theme.palette.primary.main,
      fontFamily: theme.typography.fontFamily,
      fontSize:30,
      height:20,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.palette.primary.main,
    },
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
    cardHeader:{
      root:{
        fontFamily: theme.typography.fontFamily,
        color:'#fff',
        backgroundColor: theme.palette.secondary.main,
      },
      textAlign:'center',
      fontFamily: theme.typography.fontFamily,
      color:'#fff',
      backgroundColor: theme.palette.secondary.main,
    },
    cardContent:{
      root:{
        fontFamily: theme.typography.fontFamily,
        backgroundColor: theme.palette.secondary.main,
      },
      textAlign:'center',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    }
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
        pollSubmitLoad:false,
        MyPollsLoad:false
    }
  this.handleHelpExpand = this.handleHelpExpand.bind(this)
   this.pollSubmit = this.pollSubmit.bind(this)
   this.handleSubjectChange = this.handleSubjectChange.bind(this)
   this.handleQuestionChange = this.handleQuestionChange.bind(this)
   this.handleSubjectValidationError = this.handleSubjectValidationError.bind(this)
   this.handleQuestionValidationError = this.handleQuestionValidationError.bind(this)
   this.handlePollCreateSuccess = this.handlePollCreateSuccess.bind(this)
   this.handlePollClear = this.handlePollClear.bind(this)
   this.handleMaxPollReached = this.handleMaxPollReached.bind(this)
   this.handleUnknownError = this.handleUnknownError.bind(this)
   this.renderPoll = this.renderPoll.bind(this)
   this.handlePollDeleteSuccess = this.handlePollDeleteSuccess.bind(this)
   this.handlePollDeleteAlert = this.handlePollDeleteAlert.bind(this)
   this.renderPollDeleteActions = this.renderPollDeleteActions.bind(this)
   this.renderPollDeleteAlert = this.renderPollDeleteAlert.bind(this)
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

  handlePollDeleteAlert(poll){
    this.setState({
      pollDeleteAlert: !this.state.pollDeleteAlert,
      pollToDelete: poll
    });
  };

  handleHelpExpand(){
    this.setState({ helpExpanded: !this.state.helpExpanded });
  }

  renderPoll(poll){
    console.log('this.state on renderPoll', this.state, this.props)
    return (
    <Card style={{margin:15}}>
      <AppBar
        title={poll.subject}
        showMenuIconButton={false}
        iconElementRight={<DeleteButton 
        onClick={()=>this.handlePollDeleteAlert(poll)}
      />}
      />
      <CardText style={{whiteSpace: 'normal'}}>
        {poll.question}
      
      </CardText>
    </Card>
    )
  }

  handleSubmitPollDelete(){
    this.props.pollDelete(this.state.pollToDelete)
    this.setState({pollDeleteAlert:false})
  }
  
  renderPollDeleteActions(){
    return [<FlatButton
      label="Cancel"
      primary={true}
      onClick={this.handlePollDeleteAlert}
    />,
    <FlatButton
      label="Delete Poll"
      primary={true}
      onClick={this.handleSubmitPollDelete}
    />]
  }

  renderPollDeleteAlert(){
    return(
      <Dialog
              title="Are You Sure?"
              actions={this.renderPollDeleteActions}
              modal={false}
              open={this.state.pollDeleteAlert}
            >
              Are you sure you want to delete this poll? You cannot undo this.
          </Dialog>
    )
  }


  pollSubmit(){
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
      this.setState({pollSubmitLoad:true})
      this.props.pollSend(poll)
      .then((res)=>{
          console.log('this is the response', res)
          this.handlePollClear()
          this.handlePollCreateSuccess()
          this.setState({pollSubmitLoad:false})
      })
      .catch(err=>{
        let status = err.toString().slice(-3)
        console.log('this is the error 2 ', )
        if (status.includes('550')){
          this.handleMaxPollReached();
          this.setState({pollSubmitLoad:false})
        } else {
          this.handleUnknownError();
          this.setState({pollSubmitLoad:false})
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
    // const pollDeleteActions = [<FlatButton
    //   label="Cancel"
    //   primary={true}
    //   onClick={this.handlePollDeleteAlert}
    // />,
    // <FlatButton
    //   label="Delete Poll"
    //   primary={true}
    //   onClick={this.handleSubmitPollDelete}
    // />];
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
              onClick={this.handlePollDeleteAlert} 
              className={classes.button}
            >
              Cancel
            </Button>
            </div>
            <div className={classes.container}>

            <Button 
              onClick={this.handleSubmitPollDelete} 
              autoFocus
              className={classes.button}
            >
              Delete Poll
            </Button>
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
                submitClick={this.pollSubmit}
                buttonTitle={'Submit Poll'}
                Loading={this.state.pollSubmitLoad}
              />
            </CardContent>
          </Card>
        </Paper>
        <Paper className={classes.container}>
          <CardContent className={classes.cardHeader}>
            <Typography variant="headline" component="h1" className={classes.cardHeader}>
              Poll Create
            </Typography>
          </CardContent>
          <Divider/>
          <div className="list">
            <FeedBackMyPolls
            Loading={this.state.MyPollsLoad}
            userPolls={this.props.userPolls}
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