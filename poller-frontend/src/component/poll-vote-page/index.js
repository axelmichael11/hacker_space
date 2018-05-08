//packages
import React from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import Loading from '../loading'
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
      openVoteConfirm:false,
    }
    this.renderVoteSubmitActions = this.renderVoteSubmitActions.bind(this)
    this.handleSubmitVote = this.handleSubmitVote.bind(this)
  }

  componentWillMount() {
    console.log('this.props.history on the public poll page', this.props.match)
  }
  handleOpenVoteConfirm(){
    this.setState((oldState)=>{
      return {
        openVoteConfirm: !oldState.openVoteConfirm,
      }
    })
  }


  
  renderVoteSubmitActions(){
    return [<FlatButton
      label="Cancel"
      primary={true}
      onClick={this.handleOpenVoteConfirm}
    />,
    <FlatButton
      label="Delete Poll"
      primary={true}
      onClick={this.handleSubmitVote}
    />]
  }

  handleSubmitVote(){
    this.props.submitVote()
  }

  render() {
    console.log('poll vote page', this.props)
    return (
      <MuiThemeProvider>
        <Dialog
          title="Confirming Your Vote"
          actions={this.renderVoteSubmitActions}
          modal={false}
          open={this.state.openVoteConfirm}
          onRequestClose={this.handleOpenVoteConfirm}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
          <Card>
          <CardText style={{...MaterialStyles.title, margin:15}}> What Do You Think? </CardText>
            <div id="parent" >
              <Assessment style={MaterialStyles.middle_icon}/>
              <SwapVert style={MaterialStyles.middle_icon}/>
              <ThumbUp style={MaterialStyles.middle_icon}/>
              <ThumbDown style={MaterialStyles.middle_icon}/>
            </div>
          </Card>
          <Card>
            <AppBar
              showMenuIconButton={false}
            />
          <CardMedia>
          </CardMedia>
          <CardText style={MaterialStyles.text}>
            Subject
          </CardText>
          <CardText style={MaterialStyles.title}>
             {this.props.location.state.subject}
          </CardText>
          <CardText style={MaterialStyles.text}>
            Question
          </CardText>
          <CardText style={MaterialStyles.title}>
            {this.props.location.state.question}
          </CardText>
          </Card>
          <Card>
            <FlatButton
              label="YES"
              primary={true}
              onClick={this.handleOpenVoteConfirm}
            />
            <FlatButton
              label="NO"
              primary={true}
              onClick={this.handleSubmitVote}
            />
          </Card>
        </MuiThemeProvider>
    )
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  Loading: state.Loading
})

export const mapDispatchToProps = dispatch => ({
    fetchVoteHistory: (poll) => dispatch(fetchVoteHistory(poll))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PollVotePage))