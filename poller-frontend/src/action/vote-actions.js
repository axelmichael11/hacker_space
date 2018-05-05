const superagent = require('superagent');

import {loadingOn, loadingOff} from './loading-actions'

const fetchVote = (poll) => {
    return { type: 'public_polls_fetch', payload: polls }
  }


export const fetchVoteHistory = (poll) => (dispatch, getState) => {
    let { auth0Token } = getState();

    dispatch(loadingOn())

    return superagent.get(`${__API_URL__}/api/explore`)
    .set('Authorization', `Bearer ${auth0Token}`)
    .send(poll)
    .then(res => {
        let parsed = JSON.parse(res.text)
        console.log(parsed)
        dispatch(fetchPublicPolls(parsed))
    })
    .catch(err => {
        if (err.status == 550){
        throw new Error(550)
        } 
    })
}