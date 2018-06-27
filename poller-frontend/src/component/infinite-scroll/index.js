
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Auth0Lock from 'auth0-lock'
import InfiniteScroll from 'react-infinite-scroller'
import {  compose, branch, renderComponent} from 'recompose'
import _ from 'lodash'
import { withStyles } from '@material-ui/core';



import Paper from 'material-ui/Paper'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import '../../style/index.scss'

import {fetchPolls} from '../../action/public-poll-actions.js'
import LoginPage from '../login'

import UserPollCard from '../user-poll-card'

import IconButton from '@material-ui/core/IconButton';
import NotInterested from '@material-ui/icons/NotInterested';
import Loader from '../loading/loader'
import Error from '../error'
import Button from '@material-ui/core';
import ResponsiveDialog from '../dialog'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NoPolls from './no-polls'
import LoadingHOC from '../loading/loadingHOC.js'
import MaxPolls from './max-polls'




const styles = (theme) =>({
  button:theme.overrides.MuiButton,
})


const List = ({ ...props }) => {
  let pollList = Object.keys(props.list)
  return(
    <div className="list">
    {pollList.map((poll, key) => 
      <div className="list-row" key={poll.objectID}>
        <UserPollCard
          pollActions={<IconButton
            onClick={(event)=> {
              props.handleOpenCardMenu(event)
              props.setPoll(poll)
            }}
            >
            <MoreVertIcon 
            style={{color:'#fff'}}
            />
            </IconButton>}
          poll={props.list[poll]}
          key={key}
        />
      </div>)}
  </div>
  )
}


{/* <SearchPollsButton timeError={props.fetchPolls} {...props}/>  */}


const withError = (conditionFn)  => (Component) => (props) => {
  console.log('hitting withError')

  return (
  <div>
        <Component {...props} />

    <div className="interactions">
      {
        conditionFn(props) &&
        <div>
          <Error {...props}/>
        </div>
      }
    </div>
  </div>
  )
}


const WithLoading = (conditionFn) => (Component) => (props) => {
  console.log('hitting withLoading' ,props, Component)
  return(
    <div>
    <Component {...props} />

    <div className="interactions">
    {conditionFn(props) && <Loader start={Date.now()} timeError={props.throwError}/>}
    </div>
  </div>
  )
}


const SearchPollsButton = ({...props}) =>{
  console.log('hitting searchPollsButton', props)

  return (
    <div>
      <NoPolls/>
        {/* <Button 
              variant="outlined"
              onClick={props.fetchPolls} 
              // className={props.classes.button}
              >
              SEARCH FOR MORE POLLS
        </Button> */}
    </div>
  )
}



const FeedBackSearchPollsButton = LoadingHOC(SearchPollsButton)
const FeedBackMaxPollsSearch = LoadingHOC(MaxPolls)


const WithNoPolls  = (conditionFn) => (Component) => (props) => {
  console.log('hitting WITH NO POLLS', props)
    
  return (
    <div>
      <Component {...props} />
      <div>
      { conditionFn(props) && <NoPolls/>}
      </div>
    </div>
   )
}

      // <FeedBackSearchPollsButton 
      //     loadingError={props.error}
      //     {...props}
      //     />




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
           _.throttle(this.props.fetchPolls(), 800)
          }
        }
    
        render() {
          console.log('INFINITE SCROLL', window.innerHeight, window.pageYOffset,'>=', document.body.offsetHeight, )
          return (<Component {...this.props} />)
        }
      }

  const infiniteScrollCondition = props =>
  (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight
  && !props.maxPublicPolls
  && !props.Loading
  && !props.error;

  const loadingCondition = props =>
  props.Loading;


  const errorCondition = props =>
   !props.Loading && props.error;

   const noPollsCondition = props =>
   props.pollCount===0 && !props.Loading && !props.error;

   const maxPublicPollsCondition = props =>
   props.maxPublicPolls && !props.Loading && !props.error ;

   const withMaxPublicPolls = (conditionFn) => (Component) => (props) =>
    <div>
      <Component {...props} />
      <div>
      { conditionFn(props) && 
      <FeedBackMaxPollsSearch 
        submitClick={props.fetchPolls}
        dialogSubmitText={props.dialogSubmitText}
        Loading={props.Loading}
        timeError={props.timeError}
        loadingError={props.error} 
        {...props}
        />
        }
      </div>
    </div>



 const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  publicPolls: state.publicPolls,
  maxPublicPolls: state.maxPublicPolls
})

 const mapDispatchToProps = dispatch => ({
})



  const AdvancedList = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withError(errorCondition),
    withInfiniteScroll(infiniteScrollCondition),
    withMaxPublicPolls(maxPublicPollsCondition),
    WithNoPolls(noPollsCondition),
    WithLoading(loadingCondition),
  )(List);

  // const AdvancedList = compose(
  //   branch(
  //     (props) =>
  //     props.pollCount === 0
  //     && !props.error,
  //     renderComponent(WithNoPolls)
  //   ),
  //   branch(
  //     (props) =>
  //      props.pollCount > 0
  //     && !props.error,
  //     renderComponent(InfiniteLoad)
  //   ),

  // )(InfiniteLoad)

  export default AdvancedList

