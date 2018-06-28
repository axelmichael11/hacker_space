
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Auth0Lock from 'auth0-lock'

import {  compose } from 'recompose'
import {loadingOn, loadingOff} from '../../action/loading-actions'
import MaterialStyles from '../../style/material-ui-style'

import '../../style/index.scss'

import {getPublicPolls, fetchPublicPolls} from '../../action/public-poll-actions.js'

import LoginPage from '../login'
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AdvancedList from '../infinite-scroll'
import ResponsiveDialog from '../dialog'
import CardMenu from '../card-menu'
import MenuItem from '@material-ui/core/MenuItem';
import {reportPoll} from '../../action/report-poll-actions'
import {handleThen} from '../../lib/util'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NotInterested from '@material-ui/icons/NotInterested';
import Snackbar from '@material-ui/core/Snackbar';


const styles = theme =>({
  button: theme.overrides.MuiButton,
  menuItem: theme.overrides.MuiMenuItem,
  
})

class ExplorePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      polls: this.props.publicPolls,
      previousPolls:0,
      pollCount: Object.keys(this.props.publicPolls).length,
      noPolls:false,
      //loading
      exploreLoading:false,
      reportLoading:false,
      searchMoreLoading:false,

      exploreError: false,
      renderCount:0,
      maxPublicPolls: this.props.maxPublicPolls,

      //dialog
      dialogOpen: false,
      dialogTitle:'',
      dialogSubmitText:'',
      dialogContent:'',

      //report dialog
      reportPollSuccessSnack: false,
      reportPollErrorSnack: false,
      reportTitle:'Report This poll?',
      reportContent:"Is this poll offensive? Please report if so and we will review this shortly! Sorry for the material :(",
      submitReportText:'Report Poll',
      reportContentSuccess:'This poll has been reported... we will review this',
      reportContentError: 'There was an error reporting this ... try again later',
      snackBarDuration:4000,

      //card menu
      anchorEl: null,
      pollMenuFocus:null,


    }

    this.fetchPolls = this.fetchPolls.bind(this)
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.openReportDialog = this.openReportDialog.bind(this);
    this.handleOpenCardMenu = this.handleOpenCardMenu.bind(this)
    this.handleCloseCardMenu = this.handleCloseCardMenu.bind(this)
    this.renderMenuButtons = this.renderMenuButtons.bind(this)
    this.reportPoll = this.reportPoll.bind(this)
    this.throwError = this.throwError.bind(this)
    this.setPoll = this.setPoll.bind(this)
    this.handleReportSuccess = this.handleReportSuccess.bind(this)
    this.handleReportError = this.handleReportError.bind(this)
    this.renderReportDialogContent = this.renderReportDialogContent.bind(this)
  }

  componentWillMount(){
    console.log('publicPolls on explore page', this.props.publicPolls)
    let publicPollsCount = Object.keys(this.props.publicPolls)
      this.fetchPolls()
  }

  componentWillUnmount(){
    // this.setState({onExplorePage:false})
  }

  fetchPolls(){
    this.setState({exploreLoading:true, exploreError:false })
    this.props.getPublicPolls()
    .then((res)=>{
      console.log("HITTING RESPONSE!!", res)
      if( res.polls.length===0){
        this.setState({
          exploreLoading:false, 
          exploreError:false,
          noPolls:true,
        })
      }
      if (res.polls.length > 0){
        this.setState({
          exploreLoading:false, 
          exploreError:false,
          noPolls:false,
        })
      }
    })
    .catch((err)=>{
      console.log("HITTING ERROROR!!", err)
      this.setState({exploreLoading:false, exploreError:true})
    })
  }

  handleCloseDialog(){
    this.setState({
      dialogOpen:false,
      dialogTitle:'',
      dialogSubmitText:'',
    })
  }


  openReportDialog(poll){
    console.log('hitting open report dialog')

    this.setState({
      dialogTitle: this.state.reportTitle,
      dialogContent: this.state.reportContent,
      dialogSubmitText: this.state.submitReportText,
      dialogOpen: true,
      anchorEl:null,
      dialogContent: this.renderReportDialogContent()
    })
  }
  
  handleOpenCardMenu(event){
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseCardMenu(){
    this.setState({ anchorEl: null, reportDialog: false, pollMenuFocus:null });
  };

  renderMenuButtons(){
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


  reportPoll(){
    console.log('report POlL!!')
    this.setState({ reportLoading: true });
    let pollToReport = this.props.publicPolls[this.state.pollMenuFocus]
    console.log('poll to report!!', this.state.pollMenuFocus, pollToReport)
    this.props.reportPoll(pollToReport)
    .then((res)=>{
        console.log(res)
        if (res.status===200){
         this.handleReportSuccess()
        }
      })
    .catch((err)=>{
      console.log(err)
      if (err.status===500){
        this.handleReportSuccess()
       }
      })
}

throwError(){
  this.setState({exploreLoading: false, exploreError:true})
}

setPoll(poll){
  this.setState({pollMenuFocus: poll})
}

handleReportSuccess(){
  this.setState((oldState)=> {
      return {
        reportPollErrorSnack: false,
        reportPollSuccessSnack: !oldState.reportPollSuccessSnack,
        dialogOpen: false,
        reportLoading:false,
      }
    })
  }

  handleReportError(){
    this.setState((oldState)=> {
      return {
        reportPollSuccessSnack:false,
        reportPollErrorSnack: !oldState.reportPollErrorSnack,
        dialogOpen: false,
        reportLoading:false,
      }
    })
  }
  renderReportDialogContent(){
    return "Is this poll offensive? Please report if so and we will review this shortly! Sorry for the material :("
  }


  render() {
    const {stepIndex} = this.state;  
    const {classes} = this.props;

    console.log('explore page', this.state, this.props)
    return (
        // <div className="endless-scroller">
        <div>
          <ResponsiveDialog
                dialogTitle={this.state.dialogTitle}
                dialogContent={this.state.dialogContent}
                // DialogSubmitButton={FeedBackReportButton}
                dialogOpen={this.state.dialogOpen}
                handleClose={this.handleCloseDialog}
                dialogSubmitText={this.state.dialogSubmitText}
                submitClick={this.reportPoll}
                submitLoading={this.state.reportLoading}
                timeError={this.handleReportError}
                />

                <CardMenu
                  anchorEl={this.state.anchorEl}
                  renderMenuButtons={this.renderMenuButtons}
                  handleClose={this.handleCloseCardMenu}
                />

            <AdvancedList
              list={this.props.publicPolls}
              error={this.state.exploreError}
              Loading={this.state.exploreLoading}
              page={this.state.page}
              fetchPolls={this.fetchPolls}
              handleOpenCardMenu={this.handleOpenCardMenu}
              noPolls={this.state.noPolls}
              // classes={classes}
              errorTry={this.fetchPolls}
              timeError={this.fetchPolls}
              throwError={this.throwError}
              setPoll={this.setPoll}
              pollCount={this.state.pollCount}
              maxPublicPolls={this.state.maxPublicPolls}
              />


              <Snackbar
                open={this.state.reportPollSuccessSnack}
                message={this.state.reportContentSuccess}
                action={null}
                autoHideDuration={this.state.snackBarDuration}
                onClose={this.handleReportPollSuccess}
              />
              <Snackbar
                open={this.state.reportPollErrorSnack}
                message={this.state.reportContentError}
                action={null}
                autoHideDuration={this.state.snackBarDuration}
                onClose={this.handleReportError}
              />
        </div>
      )
    }
  }

export const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    publicPolls: state.publicPolls,
    maxPublicPolls: state.maxPublicPolls
  })
  
  export const mapDispatchToProps = dispatch => ({
    getPublicPolls:()=>dispatch(getPublicPolls()),
    fetchPublicPolls:(poll)=> dispatch(fetchPublicPolls(poll)),
    reportPoll: (poll)=>dispatch(reportPoll(poll))
  })

    
export default compose(
  withStyles(styles, {withTheme:true}),
  connect(mapStateToProps, mapDispatchToProps),
)(ExplorePage);

