//packages
import React from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import Loading from '../loading'
import TotalVotesGraph from '../charts/vote-totals/index'

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

import ReligionPieResults from '../charts/religion/index'
import GenderPieResults from '../charts/gender/index'

class PollResultsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pollData: this.props.pollData
    }
    
  }

  componentWillMount() {
    console.log('this.props.history on the public poll page', this.props.match)
  }
  
  render() {
    console.log('pollResultsPage',this.state, this.props)
    return (
      <div>
        <MuiThemeProvider>
          <TotalVotesGraph totalVotesData={this.state.pollData.totals_data} />
          <ReligionPieResults totalsData={this.state.pollData.totals_data} yesVoteData={this.state.pollData.yes_data.religion_data} noVoteData={this.state.pollData.no_data.religion_data}/>
          <GenderPieResults totalsData={this.state.pollData.totals_data} yesVoteData={this.state.pollData.yes_data.gender_data} noVoteData={this.state.pollData.no_data.gender_data}/>
        </MuiThemeProvider>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  Loading: state.Loading
})

export const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(PollResultsPage)