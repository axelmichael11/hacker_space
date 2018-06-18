
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


const styles = theme =>({
  button: theme.overrides.MuiButton,
  menuItem: theme.overrides.MuiMenuItem,
  // primary: {},
  // icon: {},
})

class ExplorePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      polls: this.props.publicPolls,
      previousPolls:0,
      // onExplorePage:false,

      //loading
      exploreLoading:false,
      dialogLoading:false,


      exploreError: false,
      renderCount:0,
      maxContentReached: false,

      //dialog
      dialogOpen: false,
      dialogTitle:'',
      dialogSubmitText:'',
      dialogContent:'',

      //report dialog
      reportTitle:'Report This poll?',
      reportContent:"Is this poll offensive? Please report if so and we will review this shortly! Sorry for the material :(",
      submitReportText:'Report Poll',

      //card menu
      anchorEl: null,
      pollMenuFocus:null,


    }

    this.fetchPolls = this.fetchPolls.bind(this)
    this.handleRenderCount = this.handleRenderCount.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.openReportDialog = this.openReportDialog.bind(this);
    this.handleOpenCardMenu = this.handleOpenCardMenu.bind(this)
    this.handleCloseCardMenu = this.handleCloseCardMenu.bind(this)
    this.renderMenuButtons = this.renderMenuButtons.bind(this)
    this.reportPoll = this.reportPoll.bind(this)
    this.throwError = this.throwError.bind(this)
    this.setPoll = this.setPoll.bind(this)
  }

  componentWillMount(){
    if (this.props.publicPolls.length===0){
      this.fetchPolls()
    }
  }

  componentWillUnmount(){
    // this.setState({onExplorePage:false})
  }

  fetchPolls(){
    this.setState({exploreLoading:true, exploreError:false })
    this.props.getPublicPolls()
    .then((res)=>{
      this.setState({exploreLoading:false })
    })
    .catch((err)=>{
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


 
  handleRenderCount(){
    let percent;

    // for (var i = 0; i <this.props.polls.length; i++){
    //   for (var j = 0; j <this.props.polls.length; j++){
    //     if (this.props.polls[i].created_at === this.props.polls[j].created_at){

    //     } 
    // }

    // this.setState((oldState)=>{
    //   return {
    //     renderCount: oldState.renderCount+1,
    //     exploreLoading: false,
    //     previousPolls: this.props.polls.length
    //   }
    // })
  }

  openReportDialog(poll){
    console.log('hitting open report dialog')

    this.setState({
      dialogTitle: this.state.reportTitle,
      dialogContent: this.state.reportContent,
      dialogSubmitText: this.state.submitReportText,
      dialogOpen: true,
      anchorEl:null,
    })
  }
  
  handleOpenCardMenu(event){
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseCardMenu(){
    this.setState({ anchorEl: null, reportDialog: false, pollMenuFocus:null });
  };

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


  reportPoll(){
    console.log('report POlL!!')
    this.setState({ dialogLoading: true });
    this.props.reportPoll(this.state.pollMenuFocus)
    .then((res)=>{
        console.log(res)
        handleThen(res, 
          {status:200, 
          state: { exploreLoading:false, 
            exploreError:true,
            dialogOpen:false,
          },
        })
      })
    .catch((err)=>{
        console.log(err)
        this.setState({ dialogLoading: false });
      })
}

throwError(){
  this.setState({exploreLoading: false, exploreError:true})
}

setPoll(poll){
  this.setState({pollMenuFocus: poll})
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
                submitLoading={this.state.dialogLoading}
                classes={classes}
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
              classes={classes}
              errorTry={this.fetchPolls}
              throwError={this.throwError}
              setPoll={this.setPoll}
              />
        </div>
      )
    }
  }

export const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    publicPolls: state.publicPolls,
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

