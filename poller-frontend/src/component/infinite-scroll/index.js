
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Auth0Lock from 'auth0-lock'
import InfiniteScroll from 'react-infinite-scroller'
import {  compose } from 'recompose'
import _ from 'lodash'

import Paper from 'material-ui/Paper'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from '@material-ui/core/CircularProgress';

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

import {fetchPolls} from '../../action/public-poll-actions.js'
import LoginPage from '../login'

import UserPollCard from '../user-poll-card'

import IconButton from '@material-ui/core/IconButton';
import NotInterested from '@material-ui/icons/NotInterested';

import Loader from '../loading/loader'
const List = ({ ...props }) =>
    <div className="list">
    {props.list.map((poll, key) => 
      <div className="list-row" key={poll.objectID}>
        <UserPollCard
          pollActions={<IconButton
            onClick={()=> props.openReportDialog( poll)}
            >
            <NotInterested 
            style={{color:'#fff'}}
            />
            </IconButton>}
          poll={poll}
          key={key}
          // classes={props.classes}
        />
      </div>)}
  </div>


const Loading = (props) => {
  const { classes } = props;
  return (
    <div>
      <CircularProgress style={{ color: "#000", textAlign:'center', margin:'auto' }} thickness={7} size={50}/>
    </div>
  );
};

const withPaginated = (conditionFn) => (Component) => (props) =>
  <div>
    <Component {...props} />

    <div className="interactions">
      {
        conditionFn(props) &&
        <div>
          <div>
            Something went wrong...
          </div>
          <button
            type="button"
            onClick={props.fetchPolls}
          >
            Try Again
          </button>
        </div>
      }
    </div>
  </div>


const withLoading = (conditionFn) => (Component) => (props) => {
  console.log('HITTING LOADING COMPONENT', conditionFn, Component, props, )
  return(
    <div>
    <Component {...props} />

    <div className="interactions">
      {conditionFn(props) && <Loader/>}
    </div>
  </div>
  )
}





const withInfiniteScroll =(conditionFn) => (Component) => 
  class WithInfiniteScroll extends React.Component {
   constructor(props) {
        super(props);
        this.state={
          scrollY : document.scrollY,
          innerHeight: document.innerHeight,

        }
        this.onScroll = this.onScroll.bind(this);
        } 

      componentWillMount(){
        console.log('infinite scroll component!', this.state, this.props);
      }

    componentDidMount() {
      console.log("hiting component DID MOUNT")
      window.addEventListener('scroll',  this.onScroll, true);
    }

    componentWillUnmount() {
      console.log("hiting component WILL UNMOUNT")
      window.removeEventListener('scroll', this.onScroll, true );
    }

    onScroll(){
      console.log("hiting onscroll methoD", conditionFn(this.props))

      if (conditionFn(this.props)){
       _.throttle(this.props.fetchPolls(), 200)
      }
    }

    render() {
      console.log('INFINITE SCROLL', window.innerHeight, window.pageYOffset,'>=', document.body.offsetHeight, )
      return (<Component {...this.props} />)
    }
  }

  const infiniteScrollCondition = props =>
  (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight
  && props.list.length
  && !props.Loading
  && !props.error;

  const loadingCondition = props =>
  props.Loading;


  const paginatedCondition = props =>
   !props.Loading && props.error;

  const AdvancedList = compose(
    withPaginated(paginatedCondition),
    withInfiniteScroll(infiniteScrollCondition),
    withLoading(loadingCondition),
  )(List);

export default AdvancedList