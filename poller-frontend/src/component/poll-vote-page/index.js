//packages
import React from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {recompose, compose} from 'recompose'
import { withStyles } from '@material-ui/core/styles';

import {Loading} from '../loading'
import {
  castVote
} from '../../action/vote-actions'
import {loadingOff} from '../../action/loading-actions'

//Methods

import * as util from '../../lib/util.js'
//These will be used, to store id of the user in the database...



//Style

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

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
import DropDownArrowIcon from '@material-ui/icons/ArrowDropDown'
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import ProfileCategory from './profile-category'
import CardMenu from '../card-menu'

import LoadingHOC from '../loading'
const styles = theme =>({
  container: theme.overrides.MuiPaper,
  text: theme.typography.text,
  listContainer: theme.overrides.MuiListItem.container,
  listItem:theme.overrides.MuiListItem,
  buttonContainer: theme.overrides.MuiButton.root.container,
  button: theme.overrides.MuiButton.root.button,
  cardHeader:theme.overrides.PollCard.cardHeader,


})


const VoteButtons = ({...props}) =>{
  return (
    <div className={props.classes.buttonContainer}>
      <Button 
      variant="outlined"
      onClick={props.handleConfirmYesVoteAlert} 
      className={props.classes.button}
      >
      YES
      </Button>
      <Button 
      variant="outlined"
      onClick={props.handleConfirmNoVoteAlert} 
      className={props.classes.button}
      >
      NO
      </Button>
    </div>
  )
}

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



class PollVotePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openVoteConfirmAlert:false,
      vote:null,
      castVoteLoad: false,
    }
    this.handleConfirmYesVoteAlert = this.handleConfirmYesVoteAlert.bind(this)
    this.handleSubmitVote = this.handleSubmitVote.bind(this)
    this.handleCancelVote = this.handleCancelVote.bind(this)
    this.handleConfirmNoVoteAlert = this.handleConfirmNoVoteAlert.bind(this)
  }

  componentWillMount() {
    console.log('this.props.history on the vote  poll page', this.props.match)
  }


  handleConfirmYesVoteAlert(){
    this.setState((oldState)=>{
      return {
        openVoteConfirmAlert: !oldState.openVoteConfirmAlert,
        vote:"yes",
      }
    });
  }

  handleConfirmNoVoteAlert(){
    this.setState((oldState)=>{
      return {
        openVoteConfirmAlert: !oldState.openVoteConfirmAlert,
        vote:"no",
      }
    });
  }

  handleCancelVote(){
    this.setState({
      vote:null,
      openVoteConfirmAlert: false,
    })
  }




  handleSubmitVote(){
    let {vote} = this.state
    let voteData = Object.assign({}, {...this.props.userProfile, ...this.props.location.state, vote})
    console.log('hitting the handleSubmitVote:::', voteData)
    this.setState({castVoteLoad:true})
    this.props.castVote(voteData)
    .then((result)=>{
      console.log('this is the result', result)
      if (result.status==200){
        this.props.successOnCastVote(result)
        this.setState({castVoteLoad:false})

      }
    })
    .catch(err=>{
      console.log('this si the errro', err)
      this.props.errorOnCastVote()
      this.setState({castVoteLoad:false})

  })
  }

  render() {
    console.log('poll vote page', this.props, this.state)
    let {classes} = this.props
    let {subject, author_username, question } = this.props.location.state

    return (

      <div>
         <Dialog
            open={this.state.openVoteConfirmAlert}
            modal={false}
        >
          <DialogTitle id="alert-dialog-title">"Are you sure?"</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            You are about to submit this demographic information for the question!
            <ProfileCategory
              value={this.props.userProfile.age}
              category={"Age"}
              // classes={classes}
            />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <div className={classes.container}>

            <Button 
              onClick={this.handleCancelVote} 
              className={classes.button}
            >
              Cancel
            </Button>
            </div>
            <FeedBackSubmitButton
            classes={classes}
            submitClick={this.handleSubmitVote}
            buttonTitle={"Submit Vote"}
            Loading={this.props.Loading}
            />
          </DialogActions>
        </Dialog>


        <Paper square elevation={2} className={classes.container}>
            <Card>
            <CardHeader
                action={<CardMenu/>} //REPORT POST FEATURE
                className={classes.cardHeader}
            />
            
            <CardContent>
                <Typography variant="headline" component="h1">
                   "{question}"
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="subheading" component="p">
                    {subject}
                </Typography>
                <Typography variant="subheading" component="p">
                    {'Posted By: '+author_username}
                </Typography>
            </CardContent>
            </Card>
        </Paper>
        <Paper square elevation={2} className={classes.container}>
          <VoteButtons
          handleConfirmNoVoteAlert={this.handleConfirmNoVoteAlert}
          handleConfirmYesVoteAlert={this.handleConfirmYesVoteAlert}
          classes={classes}

          />
        </Paper>
      </div>
      )
    }
  }

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  Loading: state.Loading,
  userProfile: state.userProfile
})

export const mapDispatchToProps = dispatch => ({
    fetchVoteHistory: (poll) => dispatch(fetchVoteHistory(poll)),
    castVote: (voteData) => dispatch(castVote(voteData)),
    loadingOff: ()=>dispatch(loadingOff())
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
withStyles(styles, {withTheme:true}),
withRouter,
)(PollVotePage);