
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Auth0Lock from 'auth0-lock'

import {  compose } from 'recompose'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import AdvancedList from '../infinite-scroll/index.js'
import {
    Step,
    Stepper,
    StepButton,
    StepContent,
  } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import MaterialStyles from '../../style/material-ui-style'
import AppBar from 'material-ui/AppBar'
import '../../style/index.scss'

import {getPublicPolls} from '../../action/public-poll-actions.js'

import LoginPage from '../login'
import Loading from '../loading'





class ExplorePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      polls: this.props.publicPolls,
      Loading:this.props.Loading,
      isError: this.props.isError,
    }
  }

  componentWillMount(){
    this.props.getPublicPolls()
  }




  render() {
    const {stepIndex} = this.state;    
    console.log('explore page', this.state, this.props)
    return (
        <div className="endless-scroller">
        <MuiThemeProvider>
            <CardText style={MaterialStyles.title}> Explore </CardText>
            
            <AdvancedList
              list={this.props.publicPolls}
              isError={this.state.isError}
              Loading={this.state.Loading}
              page={this.state.page}
              getPublicPolls={this.props.getPublicPolls}
              />
            </MuiThemeProvider>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    publicPolls: state.publicPolls,
    Loading: state.Loading,
    isError: state.isError,
  })
  
  export const mapDispatchToProps = dispatch => ({
    getPublicPolls:()=>dispatch(getPublicPolls())
    
  })

    
// const ListWithLoadingWithInfinite = compose(
//   withInfiniteScroll,
//   Loading,
// )(List);



export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage)


