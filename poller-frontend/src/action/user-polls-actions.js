
const superagent = require('superagent');
import {loadingOn, loadingOff} from './loading-actions'


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
        })
        .catch(err => {
          if (err.status == 550){
            throw new Error(550)
          } 
        })
  }

  export const pollsFetch = (poll) => (dispatch, getState) => {
    let { auth0Token } = getState();
    // dispatch(loadingOn())
    return superagent.get(`${__API_URL__}/api/poll`)
        .set('Authorization',`Bearer ${auth0Token}`)
        .set('accept', 'application/json')
        .set('content-type', 'application/json')
        .then(res => {
            let parsed = JSON.parse(res.text)
            dispatch(fetchUserPolls(parsed))
            // dispatch(loadingOff())
            return parsed
            console.log('poll retrieve!!',parsed)
        })
        .catch(err => {
            dispatch(loadingOff())
            console.log(err)
            throw new Error(err)
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
                console.log('poll retrieve!!',parsed)
            })
            .catch(err => {
              if (err.status == 550){
                throw new Error(550)
              }
            })
      }