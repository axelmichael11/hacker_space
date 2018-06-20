const superagent = require('superagent');
import {loadingOn, loadingOff} from './loading-actions'



const fetchPublicPolls = (polls) => {


    return { type: 'public_polls_fetch', payload: polls }
  }

  
const filterOutPoll = (newPolls)=>{
    return {type: 'public_poll_filter', payload: newPolls}
} 


  const fetchPollsExperiment = (publicPolls, newPolls) => {
    let pollStateLength = Object.keys(publicPolls).length
    console.log('hitting fetch polls experiment')
    for (let i = 0; i <newPolls.length;i++ ){
        console.log('POLL', newPolls[i])
        if (!publicPolls[newPolls[i].created_at]){
            publicPolls[newPolls[i].created_at]= newPolls[i];
        }
    }
    return {type: 'public_polls_fetch', payload: publicPolls}
}

export const getPublicPolls = () => (dispatch, getState) => {
    let { auth0Token, publicPolls } = getState();
    
    return superagent.get(`${__API_URL__}/api/explore`)
    .set('Authorization', `Bearer ${auth0Token}`)
    .then(res => {
        let parsed = JSON.parse(res.text)
        console.log('parsed from GET PUBLIC POLLS ACTION', parsed)
        dispatch(fetchPollsExperiment(publicPolls, parsed))
        return parsed;
    })
    .catch(err => {
        console.log('parsed from GET PUBLIC POLLS ACTION', err)

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