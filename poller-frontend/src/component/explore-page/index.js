
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
      onExplorePage:false,
      exploreLoading:false,
      exploreError: false,
    }
    this.fetchPolls = this.fetchPolls.bind(this)
  }

  componentWillMount(){
    if (this.props.publicPolls.length===0){
      this.setState({exploreLoading:true, onExplorePage:true})
      this.fetchPolls()
    }
  }

  componentWillUnmount(){
    this.setState({onExplorePage:false})
  }

  fetchPolls(){
    this.props.getPublicPolls()
    .then((res)=>{
      console.log(res)
      this.setState({exploreLoading:false, exploreError:false})
    })
    .catch((err)=>{
      this.setState({exploreLoading:false, exploreError: true})
    })
  }


  render() {
    const {stepIndex} = this.state;    
    console.log('explore page', this.state, this.props)
    return (
        // <div className="endless-scroller">
        <div>
            <AdvancedList
              list={this.props.publicPolls}
              error={this.state.exploreError}
              Loading={this.state.exploreLoading}
              page={this.state.page}
              fetchPolls={this.fetchPolls}
              onExplorePage={this.state.onExplorePage}
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
    fetchPublicPolls:()=> dispatch(fetchPublicPolls(polls)),
    loadingOn:()=>dispatch(loadingOn()),
    loadingOff: ()=> dispatch(loadingOff())
  })

    
export default compose(
  withStyles(styles, {withTheme:true}),
  connect(mapStateToProps, mapDispatchToProps),
)(ExplorePage);

