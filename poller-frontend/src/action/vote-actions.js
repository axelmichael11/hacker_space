const superagent = require('superagent');

import {loadingOn, loadingOff} from './loading-actions'

const fetchVote = (poll) => {
    return { type: 'public_polls_fetch', payload: polls }
  }


export const fetchVoteHistory = (poll) => (dispatch, getState) => {
    let { auth0Token } = getState();
    return superagent.post(`${__API_URL__}/api/votes`)
    .set('Authorization', `Bearer ${auth0Token}`)
    .send(poll)
    .then(res => {
        let parsed = JSON.parse(res.text)
        parsed.status=res.status
        return parsed
      })
}


export const castVote = (voteData) => (dispatch, getState) => {
  let { auth0Token } = getState();
  return superagent.post(`${__API_URL__}/api/castvote`)
  .set('Authorization', `Bearer ${auth0Token}`)
  .send(voteData)
  .then(res => {
        let parsed = JSON.parse(res.text)
        parsed.status=res.status
        return parsed
    })
}