
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

import PublicPoll from '../public-poll-card'

const List = ({ list }) => 
    <div className="list">
    {list.map(poll => <div className="list-row" key={poll.objectID}>
        <PublicPoll 
        author_username={poll.author_username} 
        created_at={poll.created_at}
        subject={poll.subject}
        question={poll.question}
        />
    </div>)}
  </div>


const Loading = (props) => {
  const { classes } = props;
  return (
    <div>
      <CircularProgress style={{ color: "#000" }} thickness={7} size={50}/>
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
      {conditionFn(props) && <Loading/>}
    </div>
  </div>
  )
}





const withInfiniteScroll =(conditionFn) => (Component) => 
  class WithInfiniteScroll extends React.Component {
   constructor(props) {
        super(props);
        this.state={
          scrollY : window.scrollY,
          innerHeight: window.innerHeight,

        }
        this.onScroll = this.onScroll.bind(this);
        } 

      componentWillMount(){
        console.log('infinite scroll component!', this.state, this.props)
      }

    componentDidMount() {
      
      window.addEventListener('scroll',  _.throttle(this.onScroll, 500), false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', _.throttle(this.onScroll, 500), false);
    }

    onScroll(){
        conditionFn(this.props) && this.props.fetchPolls();
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