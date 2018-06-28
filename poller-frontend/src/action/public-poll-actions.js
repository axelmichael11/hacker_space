const superagent = require('superagent');
import {loadingOn, loadingOff} from './loading-actions'

// import {maxDataReached, maxDataNotReached} from './max-data-actions'


 const maxDataReached = () => {
    return {
      type: 'max_data_reached',
      payload: true,
    }
  }
const maxDataNotReached = () => {
    return {
      type: 'max_data_not_reached',
      payload: false,
    }
  }





const fetchPublicPolls = (polls) => {
    return { type: 'public_polls_fetch', payload: polls }
  }

const addCreatedPollToPublicPolls = (poll) => (dispatch, getState) => {
    let {publicPolls} = getState()

    publicPolls[poll.created_at] = poll;
    console.log('hitting public polls', publicPolls)
    return {type:'add_created_poll', payload: publicPolls}
}

  
const filterOutPoll = (newPolls)=>{
    return {type: 'public_poll_filter', payload: newPolls}
} 



  const fetchPollsExperiment = (dispatch, getState, newPolls) => {
    let {publicPolls} = getState()
    let alreadyExist = 0;
    let newPollsLength = newPolls.length;
    let pollStateLength = Object.keys(publicPolls).length;

    console.log('hitting fetch polls experiment')
    for (let i = 0; i <newPolls.length;i++ ){
        console.log('POLL', newPolls[i])
        if (!publicPolls[newPolls[i].created_at]){
            publicPolls[newPolls[i].created_at]= newPolls[i];
        } else {
            alreadyExist++;
        }
    }
    console.log('fetchPolls ExperimenTING', alreadyExist, newPollsLength, pollStateLength, publicPolls)

    if (alreadyExist === newPollsLength && newPollsLength>0){
        dispatch(maxDataReached())
    }
    if (alreadyExist !== newPollsLength){
        dispatch(fetchPublicPolls(publicPolls))
        dispatch(maxDataNotReached())
    }
}

export const getPublicPolls = () => (dispatch, getState) => {
    let { auth0Token, publicPolls } = getState();


    return superagent.get(`${__API_URL__}/api/explore`)
    .set('Authorization', `Bearer ${auth0Token}`)
    .then(res => {
        let parsed = {}
        parsed.polls = JSON.parse(res.text)
        console.log('parsed from GET PUBLIC POLLS ACTION', parsed)
        fetchPollsExperiment(dispatch, getState, parsed.polls)
        parsed.status = res.status
        return parsed;
    })
}


export const deletePollFromPublic = (pollToDelete) => (dispatch, getState) => {
    console.log("hitting delete poll from public!!!", pollToDelete)
    let { publicPolls } = getState();
    
    let list = Object.keys(publicPolls)

    let newPolls = list.filter((poll)=> poll!==pollToDelete.created_at)
    .reduce((acc, curr)=>{
        acc[curr]= publicPolls[curr]
        return acc;
    }, {})

    dispatch(filterOutPoll(newPolls))

}