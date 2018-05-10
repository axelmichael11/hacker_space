//packages
import React from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import Loading from '../loading'
import {
  castVote
} from '../../action/vote-actions'
//Methods

import * as util from '../../lib/util.js'
//These will be used, to store id of the user in the database...



//Style
import MaterialStyles from '../../style/material-ui-style'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import AppBar from 'material-ui/AppBar'

import SwapVert from 'material-ui/svg-icons/action/swap-vert'
import Assessment from 'material-ui/svg-icons/action/assessment'
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
// import Pencil from 'marterial-ui/svg-icons/editor/mode_edit'
// import PieChart from 'marterial-ui/svg-icons/editor/pie_chart'
// import PieChartOutlined from 'marterial-ui/svg-icons/editor/pie_chart_outlined'


// import UpArrow from 'marterial-ui/svg-icons/navigation/arrow-upward'
// import DownArrow from 'marterial-ui/svg-icons/navigation/arrow-downward'

import FlatButton from 'material-ui/FlatButton'
import FontAwesome from 'react-fontawesome' 
import Dialog from 'material-ui/Dialog';

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

class PollVotePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openVoteConfirmAlert:false,
    }
    this.handleConfirmYesVoteAlert = this.handleConfirmYesVoteAlert.bind(this)
    this.handleSubmitVote = this.handleSubmitVote.bind(this)
    this.handleCancelVote = this.handleCancelVote.bind(this)
    this.handleConfirmNoVoteAlert = this.handleConfirmNoVoteAlert.bind(this)
  }

  componentWillMount() {
    console.log('this.props.history on the public poll page', this.props.match)
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
    this.props.castVote(voteData)
    .then((result)=>{
      console.log('this is the result')
      if (result.status==200){
        this.setState({alreadyVoted:true,
        pollResults: result.rows[0]
        })
      }
    })
    .catch(err=>{
      console.log('this si the errro', err)
        this.setState({alreadyVoted:false,
          pollResults: null
          })
      this.props.loadingOff();
  })
  }

  render() {
    console.log('poll vote page', this.props, this.state)

    const confirmVoteActions = [<FlatButton
      label="Cancel"
      primary={true}
      onClick={this.handleCancelVote}
    />,
    <FlatButton
      label="Submit Vote"
      primary={true}
      onClick={this.handleSubmitVote}
    />]

    return (
      <MuiThemeProvider>
        <Dialog
          title="Confirming Your Vote"
          actions={confirmVoteActions}
          modal={false}
          open={this.state.openVoteConfirmAlert}
          onRequestClose={this.handleOpenVoteConfirmAlert}
        >
          Are you sure you want to submit your vote? Remember,
          how your demographic information information is filled out now
          will be submitted when answering the question...
        </Dialog>
        <Card  style={{maxWidth: 450, margin: 'auto'}}>
            <AppBar
            style={{...MaterialStyles.title, margin:'auto' }}
              title={'Question:'}
              showMenuIconButton={false}
            />
          <CardMedia>
            <CardText style={{...MaterialStyles.title,display:'inline-block'}}
            >
              "<CardText style={{...MaterialStyles.title,display:'inline-block'}}>
                  {this.props.location.state.question}
                </CardText>
              "
            </CardText>
          </CardMedia>
            <CardHeader
              title={this.props.location.state.subject}
              subtitle={'Posted By: '+this.props.location.state.author_username}
              style={MaterialStyles.title}
            />
         
          <Card>
            <FlatButton
              label="YES"
              primary={true}
              value={'yes'}
              onClick={this.handleConfirmYesVoteAlert}
              style={{...MaterialStyles.voteButtons, color:'#4CAF50'}}
            />
            <FlatButton
              label="NO"
              value={'no'}
              primary={true}
              onClick={this.handleConfirmNoVoteAlert}
              style={{...MaterialStyles.voteButtons, color:'#D32F2F'}}
            />
          </Card>
          </Card>
        </MuiThemeProvider>
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
    castVote: (voteData) => dispatch(castVote(voteData))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PollVotePage))