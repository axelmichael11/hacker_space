const superagent = require('superagent');

import {loadingOn, loadingOff} from './loading-actions'

const fetchVote = (poll) => {
    return { type: 'public_polls_fetch', payload: polls }
  }


export const fetchVoteHistory = (poll) => (dispatch, getState) => {
    let { auth0Token } = getState();

    dispatch(loadingOn())
    console.log('thiis the DATAAAAAA', poll)
    return superagent.post(`${__API_URL__}/api/votes`)
    .set('Authorization', `Bearer ${auth0Token}`)
    .send(poll)
    .then(res => {
        console.log('this is the status', res.status)
        if (res.status = 401){
          throw new Error(res.status)
        }
        return parsed
      })
      .catch(err => {
        if (err.status == 401){
          throw new Error(401)
        }
      })
}