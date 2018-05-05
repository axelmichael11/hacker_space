//packages
import React from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import Loading from '../loading'
import PollResponseContainer from '../poll-response-container'
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
    }
    this.fetchPollInfo = this.fetchPollInfo.bind(this)
  }

  componentWillMount() {
    console.log('this.props.history on the public poll page', this.props.match)
    this.props.fetchVoteHistory(this.props.match.params)
    // .then((result)=>{
    //   if (result.status==200){
    //     this.setState({alreadyVoted:true,
    //     pollResults: result.rows[0]
    //     })
    //   }
    //   if (result.status==401){
    //     this.setState({alreadyVoted:true,
    //       pollResults: result.rows[0]
    //       })
    //   }
    // })
    // .catch(err=>console.log(err))
  }

  fetchPollInfo(){
      return (
          this.props.Loading ? <Loading/> :
          <PollResponseContainer pollResults={this.state.pollResults} alreadyVoted={this.state.alreadyVoted}/>
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
    fetchVoteHistory: (poll) => dispatch(fetchVoteHistory(poll))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PollLandingContainer))