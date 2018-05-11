//packages
import React from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import Loading from '../loading'
import PollResponseContainer from '../poll-response-container'

import {loadingOff} from '../../action/loading-actions'

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

class PollLandingContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      alreadyVoted:false,
      pollData:null
    }
    this.fetchPollInfo = this.fetchPollInfo.bind(this)
    this.castAlreadyVoted = this.castAlreadyVoted.bind(this)
    this.setDataAfterVote = this.setDataAfterVote.bind(this)
  }

  componentWillMount() {
    console.log('POLL LANDING CONTAINER::::', this.props.location.state)
    let {created_at, author_username} = this.props.location.state
    let voteData = Object.assign({},{created_at, author_username})
    this.props.fetchVoteHistory(voteData)
    .then((result)=>{
      console.log('RESULT', result, result.status)
      if (result.status==200){
        this.setState({alreadyVoted:true,
        pollData: result,
        })
        this.props.loadingOff()
      }
    })
    .catch(err=>{
      console.log('this si the errro', err)
        this.setState({alreadyVoted:false,
          pollData: null
          })
      this.props.loadingOff();
  })
  }

  setDataAfterVote(results){
    this.setState({
      pollData: results
    })
  }

  castAlreadyVoted(){
    this.setState({alreadyVoted:true})
  }

  fetchPollInfo(){
    console.log(this.state, 'state on the poll landing containter')
      return (
          this.props.Loading ? <Loading/> :
          <PollResponseContainer 
          setDataAfterVote={this.setDataAfterVote} 
          castAlreadyVoted={this.castAlreadyVoted} 
          pollData={this.state.pollData} 
          alreadyVoted={this.state.alreadyVoted}/>
      )
  }






  render() {
    console.log('NAVBAR', this.props)
    return (
      <div className="login-box">
        {
           this.fetchPollInfo()
        }
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
    loadingOff: () => dispatch(loadingOff())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PollLandingContainer))