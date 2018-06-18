//packages
import React from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {recompose, compose} from 'recompose'
import { withStyles } from '@material-ui/core/styles';

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
import ResponsiveDialog from '../dialog'

import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotInterested from '@material-ui/icons/NotInterested';


import LoadingHOC from '../loading/button.js'

const styles = theme =>({
  container: theme.overrides.MuiPaper,
  text: theme.typography.text,
  listContainer: theme.overrides.MuiListItem.container,
  listItem:theme.overrides.MuiListItem,
  // buttonContainer: theme.overrides.MuiButton.root.container,
  button: theme.uniqueStyles.MuiVoteButton,
  cardHeader:theme.overrides.PollCard.cardHeader,
  stretchedButtons: theme.uniqueStyles.dialogStretchedButtons,

})


const VoteButtons = ({...props}) =>{
  return (
    <div 
    // className={props.classes.buttonContainer}
    >
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
    <div 
    // className={props.classes.buttonContainer}
    >
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

      castVoteError:false,
      anchorEl:null,
      pollMenuFocus:null,
      snackBarDuration: 4000,

      //poll has been deleted...
      pollNotFoundMessage:'It appears that this poll has recently been deleted! Log out or return to the explore page',
      pollNotFound:false,
    }
    this.handleConfirmYesVoteAlert = this.handleConfirmYesVoteAlert.bind(this)
    this.handleSubmitVote = this.handleSubmitVote.bind(this)
    this.handleCancelVote = this.handleCancelVote.bind(this)
    this.handleConfirmNoVoteAlert = this.handleConfirmNoVoteAlert.bind(this)
    this.renderMenuButtons = this.renderMenuButtons.bind(this)
    this.handleCloseCardMenu = this.handleCloseCardMenu.bind(this)
    this.setPoll = this.setPoll.bind(this)
    this.handleOpenCardMenu = this.handleOpenCardMenu.bind(this)
    this.handlePollNotFoundError = this.handlePollNotFoundError.bind(this)
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
    this.setState({castVoteLoad:true})
    this.props.castVote(voteData)
    .then((result)=>{
      if (result.status==200){
        this.props.successOnCastVote(result)
        this.setState({castVoteLoad:false})
      }
    })
    .catch(err=>{
      if (err.status===404){
        this.setState({castVoteLoad:false, castVoteError:true, pollNotFound:true,})
      }
      if (err.status===500){
        this.setState({castVoteLoad:false, castVoteError:true, pollNotFound:true,})
        this.props.throwGeneralError()
      }
    })
  }

  
  renderMenuButtons(){
    console.log('hitting render menu buttons')
    return (
      <MenuItem onClick={this.openReportDialog} className={this.props.classes.menuItem}
      >
        <ListItemIcon style={{display:'inline-block'}}>
            <NotInterested />
          </ListItemIcon>
        <ListItemText style={{display:'inline-block'}} inset primary="Report Poll" />
      </MenuItem>
    )
  }

  handleCloseCardMenu(){
    this.setState({ anchorEl: null, reportDialog: false, pollMenuFocus:null });
  };

    
  setPoll(poll){
    this.setState({pollMenuFocus: poll})
  }

  handleOpenCardMenu(event){
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePollNotFoundError(){
    this.setState((oldState)=>{
      return {
        pollNotFound: !oldState.pollNotFound,
      }
    });
  }

  render() {
    console.log('poll vote page', this.props, this.state)
    let {classes} = this.props
    let {subject, author_username, question, expiration } = this.props.location.state
    let poll = {subject, author_username, question, expiration};

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
          <div className={classes.stretchedButtons}>

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
            Loading={this.state.castVoteLoad}
            />
          </DialogActions>
        </Dialog>

         <CardMenu
            anchorEl={this.state.anchorEl}
            renderMenuButtons={this.renderMenuButtons}
            handleClose={this.handleCloseCardMenu}
          />


        <Paper square elevation={2} className={classes.container}>
        <Card>
            <CardHeader
                action={<IconButton
                  onClick={(event)=> {
                    this.handleOpenCardMenu(event)
                    this.setPoll(poll)
                  }}
                  >
                  <MoreVertIcon 
                  style={{color:'#fff'}}
                  />
                  </IconButton>}
                className={classes.cardHeader}
            />
            
            <CardContent>
            <Typography variant="headline" >
                    {poll.subject}
                </Typography>
                <Typography variant="display2">
                   "{poll.question}"
                </Typography>
            </CardContent>
            <CardContent>
            <Typography variant="subheading" component="p">
                    Poll Expiration: {poll.expiration} hours
                </Typography>
               
                <Typography variant="subheading" component="p">
                    {'Author: '+poll.author_username}
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

         <Snackbar
          open={this.state.pollNotFound}
          message={this.state.pollNotFoundMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handlePollNotFoundError}
        />


      </div>
      )
    }
  }

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  userProfile: state.userProfile
})

export const mapDispatchToProps = dispatch => ({
    fetchVoteHistory: (poll) => dispatch(fetchVoteHistory(poll)),
    castVote: (voteData) => dispatch(castVote(voteData)),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
withStyles(styles, {withTheme:true}),
withRouter,
)(PollVotePage);