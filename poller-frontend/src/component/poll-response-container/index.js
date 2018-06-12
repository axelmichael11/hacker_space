//packages
import React from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import {Loading} from '../loading'
import PollVotePage from '../poll-vote-page'
import PollResultsPage from '../poll-results-page'

//Methods

import * as util from '../../lib/util.js'
//These will be used, to store id of the user in the database...



//Style
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import FontAwesome from 'react-fontawesome' 

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import {withRouter} from 'react-router-dom'
import {
    fetchVoteHistory
} from '../../action/vote-actions'
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card'

class PollResponseContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      alreadyVoted: this.props.alreadyVoted,
      pollData: this.props.pollData,
    }
    this.renderResponse = this.renderResponse.bind(this)
    this.setData = this.setData.bind(this)
  }

  componentWillMount() {
    console.log('this.props on the  poll response container', this.props)
  }

  setData(results){
    this.setState({
      pollData: results
    })
  }

  renderResponse(){
    console.log('poll response container', this.state, this.props)
      return (
          this.props.alreadyVoted ? <PollResultsPage pollData={this.state.pollData}/> :
          <PollVotePage 
          castAlreadyVoted={this.props.castAlreadyVoted} 
          setDataAfterVote={this.props.setDataAfterVote}/>
      )
  }


  render() {
    console.log('NAVBAR', this.props)
    return (
      this.renderResponse()
    )
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
})

export const mapDispatchToProps = dispatch => ({
    fetchVoteHistory: (poll) => dispatch(fetchVoteHistory(poll))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PollResponseContainer))