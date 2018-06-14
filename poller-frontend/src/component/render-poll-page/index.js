
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Auth0Lock from 'auth0-lock'
import InfiniteScroll from 'react-infinite-scroller'
import {  compose, branch, renderComponent } from 'recompose'
import _ from 'lodash'

import Paper from 'material-ui/Paper'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from '@material-ui/core/CircularProgress';


import {fetchPolls} from '../../action/public-poll-actions.js'
import LoginPage from '../login'

import PublicPoll from '../public-poll-card'


import LoadingHOC from '../loading'
import PollVotePage from '../poll-vote-page'
import PollResultsPage from '../poll-results-page'
import Loader from '../loading/loader'
import Error from '../error'



  const withLoading = (conditionFn) => (Component)  => (props) => {
    console.log('HITTING LOADING COMPONENT', conditionFn, Component, props, )
    return(
      <div>  
      <div className="interactions">
        <Component {...props} />

        {conditionFn(props) && <Loader/>}
      </div>
    </div>
    )
  }




const WithPaginated = (props) => {

  return (  <div>

    <div className="interactions">
        <div>
          <div>
            Something went wrong... Log out Please
          </div>
        </div>
    </div>
  </div>
  )
}




const renderVotePage =(conditionFn) => (Component) => (props) => {
    console.log('hitting the renderVotePage!')
      return (
          <div>
              <Component {...props}/>
          {conditionFn(props) && <PollVotePage {...props}/>}
          </div>
         )
  }

  const renderVoteResults =(conditionFn) =>  (Component) => (props) => {
    console.log('hitting the rendervoteresults!')
      return (
          <div>
          {conditionFn(props) && <PollResultsPage {...props}/>}
          </div>
         )
  }


  const notYetVotedCondition = props =>
  props.alreadyVoted===false
  && props.pollData===null
  && !props.Loading
  && !props.error;

  
  const alreadyVotedCondition = props =>
  props.alreadyVoted
  && props.pollData
  && !props.Loading
  && !props.error

  const loadingCondition = props =>
  props.Loading;

  const paginatedCondition = props =>
   !props.Loading && props.error;




  const RenderPollPage = compose(
    branch(
        (props)=>props.Loading,
        renderComponent(Loader)
    ),
    branch(
        (props) =>
        props.alreadyVoted
        && props.pollData
        && !props.Loading
        && !props.error,
        renderComponent(PollResultsPage)
    ),
    branch(
        (props)=>
        !props.Loading && props.error,
        renderComponent(Error)
    )
  )(PollVotePage);

export default RenderPollPage