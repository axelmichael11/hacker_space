//packages
import React from 'react'
import { connect } from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom'
import classnames from 'classnames';

import {compose} from 'recompose'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {loadingOff} from '../../action/loading-actions'

//Methods
import {fetchVoteHistory} from '../../action/vote-actions'


import * as util from '../../lib/util.js'

import RenderPollPage from '../render-poll-page'
import ArrayBackIcon from '@material-ui/icons/arrowback';


import Button from '@material-ui/core/Button';
import HelpTab from '../help-feature'


const styles = theme => ({
  container: theme.overrides.MuiPaper,
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
  expandMoreIcon:{
    colorPrimary: theme.palette.secondary.main
  },
  backButton:theme.uniqueStyles.backButton
})


class PollLandingContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageLoading: false,
      alreadyVoted:null,
      pollData:null,
      helpExpanded: false,
      error:false,
      castVoteHelpText:"Cast your Vote! Remember, however you have set your profile information is how your vote data will be submitted! Represent yourself in the answer!",
      pollResultsHelpText: "These are the results of how people have voted based on age, gender, religious affiliation, ethnicity, and profession! See for yourself how people are voting!"
    }
    this.fetchVoteData = this.fetchVoteData.bind(this)
    this.handleHelpExpand = this.handleHelpExpand.bind(this)
    this.successOnCastVote = this.successOnCastVote.bind(this)
    this.errorOnCastVote = this.errorOnCastVote.bind(this)
    this.throwError = this.throwError.bind(this)
  }

  componentWillMount() {
    this.fetchVoteData()
  }
  
  handleHelpExpand(){
    this.setState({ helpExpanded: !this.state.helpExpanded });
  }

  successOnCastVote(pollData){
    this.setState({alreadyVoted:true, error: false, pollData: pollData})
  }
  errorOnCastVote(){
    this.setState({alreadyVoted:null, error: true, pollData: null})
  }

  fetchVoteData(){
    console.log('POLL LANDING CONTAINER::::', this.props.location.state)
    let {created_at, author_username} = this.props.location.state
    
    let voteData = Object.assign({},{created_at, author_username})
    this.setState({pageLoading:true})
    this.props.fetchVoteHistory(voteData)
    .then((result)=>{
      console.log('RESULT', result, result.status)
      if (result.status==200){
        this.setState({
        alreadyVoted:true,
        pollData: result,
        pageLoading:false,
        error:false,
        timer: 0,
        })
      }
    })
    .catch(err=>{
      console.log('this si the errro', err.status);
      if (err.status===500) {
        this.setState({
          alreadyVoted:false,
          pollData: null,
          pageLoading:false,
          error:true,
          page:null,
        });
      }
      if (err.status===401){
        this.setState({
          alreadyVoted:false,
          pollData: null,
          pageLoading:false,
          error:false,
          page:null,
        });
      }
      //only for 500 and 401 errors
    })
  }

  throwError(){
    this.setState({
      alreadyVoted:false,
      pollData: null,
      pageLoading:false,
      error:true,
      page:null,
      })
  }
  


  render() {
    console.log('poll landing container', this.props, this.state)
    let {classes} = this.props
    return (
      <div >
        <HelpTab
          helpExpanded={this.state.helpExpanded}
          handleHelpExpand={this.handleHelpExpand}
          classes={classes}
          helpText={this.state.alreadyVoted ? this.state.pollResultsHelpText: this.state.castVoteHelpText}
        />
        <RenderPollPage
        Loading={this.state.pageLoading}
        pollData={this.state.pollData}
        poll={this.props.location.state}
        alreadyVoted={this.state.alreadyVoted}
        error={this.state.error}
        successOnCastVote={this.successOnCastVote}
        errorOnCastVote={this.errorOnCastVote}
        errorTry={this.fetchVoteData}
        start={Date.now()}
        timeError={this.throwError}
        throwGeneralError={ this.throwError}
        />
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  Loading: state.Loading
})

export const mapDispatchToProps = dispatch => ({
    fetchVoteHistory: (poll) => dispatch(fetchVoteHistory(poll)),
    handleThen:(res) => dispatch(handleThen(res))
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles, {withTheme:true}),
    )(PollLandingContainer);