
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
import {Loading} from '../loading'
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AdvancedList from '../infinite-scroll'
import ResponsiveDialog from '../dialog'
import CardMenu from '../card-menu'
import MenuItem from '@material-ui/core/MenuItem';
import {reportPoll} from '../../action/report-poll-actions'


const styles = theme =>({

})


const applyUpdateResult = (result) => (prevState) => ({
  hits: [...prevState.hits, ...result.hits],
  page: result.page,
  isError: false,
  isLoading: false,
});

const applySetResult = (result) => (prevState) => ({
  hits: result.hits,
  page: result.page,
  isError: false,
  isLoading: false,
});

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

    }

    this.fetchPolls = this.fetchPolls.bind(this)
    this.handleRenderCount = this.handleRenderCount.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.openReportDialog = this.openReportDialog.bind(this);
    this.handleOpenCardMenu = this.handleOpenCardMenu.bind(this)
    this.handleCloseCardMenu = this.handleCloseCardMenu.bind(this)
    this.renderMenuButtons = this.renderMenuButtons.bind(this)
    this.reportPoll = this.reportPoll.bind(this)
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
    this.setState({exploreLoading:true, })
    this.props.getPublicPolls()
    .then((res)=>{
      console.log(res)
      this.setState({exploreLoading:false, })
    })
    .catch((err)=>{
      this.setState({exploreLoading:false,})
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
    this.setState({
      pollToReport: poll,
      dialogTitle: this.state.reportTitle,
      dialogContent: this.state.reportContent,
      dialogSubmitText: this.state.submitReportText,
      dialogOpen: true,
    })
  }
  
  handleOpenCardMenu(event){
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseCardMenu(){
    this.setState({ anchorEl: null, reportDialog: false });
  };
  renderMenuButtons(){
    return (
      <MenuItem onClick={this.openReportDialog}
      >
      Report Poll</MenuItem>
    )
  }

  reportPoll(){
    console.log('report POlL!!')
    this.setState({ dialogLoading: true });
    this.props.reportPoll(this.props.poll)
    .then((res)=>{
        console.log(res)
        this.setState({ dialogLoading: false });

      })
    .catch((err)=>{
        console.log(err)
        this.setState({ dialogLoading: false });
      })
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

            <AdvancedList
              list={this.props.publicPolls}
              error={this.state.exploreError}
              Loading={this.state.exploreLoading}
              page={this.state.page}
              fetchPolls={this.fetchPolls}
              openReportDialog={this.openReportDialog}
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

