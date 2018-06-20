
const superagent = require('superagent');
import {loadingOn, loadingOff} from './loading-actions'
import {deletePollFromPublic} from './public-poll-actions'

const fetchUserPolls = (polls) => {
      return { type: 'user_polls_fetch', payload: polls }
    }

const deleteUserPoll = (poll) => {
    return {type:'user_poll_delete', payload: poll}
}

const createPoll = (poll) => {
    return {type:'user_poll_create', payload: poll}
}





export const pollDelete = (poll) => (dispatch, getState) => {
    let { auth0Token } = getState();
    return superagent
        .delete(`${__API_URL__}/api/poll`)
        .set('Authorization', `Bearer ${auth0Token}`)
        .send(poll)
        .then(res => {
          let parsed = JSON.parse(res.text)
          dispatch(deleteUserPoll(parsed.created_at))
          dispatch(deletePollFromPublic(parsed))
          parsed.status=res.status
          console.log('parsed hitting pOLL DETELE', parsed)
          return parsed
        })
  }

  export const pollsFetch = (poll) => (dispatch, getState) => {
    let { auth0Token } = getState();
    return superagent.get(`${__API_URL__}/api/poll`)
        .set('Authorization',`Bearer ${auth0Token}`)
        .set('accept', 'application/json')
        .set('content-type', 'application/json')
        .then(res => {
            let parsed = JSON.parse(res.text)
            dispatch(fetchUserPolls(parsed))
            parsed.status=res.status
            return parsed
        })
    }


    export const pollSend = (poll) => (dispatch, getState) => {
        let { auth0Token } = getState();
        return superagent
            .post(`${__API_URL__}/api/poll`)
            .set('Authorization', `Bearer ${auth0Token}`)
            .send(poll)
            .then(res => {
                let parsed = JSON.parse(res.text)
                dispatch(createPoll(parsed))
                parsed.status=res.status
                return parsed
            })
      }