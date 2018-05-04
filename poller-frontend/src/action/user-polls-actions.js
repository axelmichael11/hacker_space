
const superagent = require('superagent');


const fetchUserPolls = (polls) => {
      return { type: 'polls_fetch', payload: polls }
    }

const deleteUserPoll = (poll) => {
    return {type:'poll_delete', payload: poll}
}

const createPoll = (poll) => {
    return {type:'poll_create', payload: poll}
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
    return superagent.get(`${__API_URL__}/api/poll`)
        .set('Authorization',`Bearer ${auth0Token}`)
        .set('accept', 'application/json')
        .set('content-type', 'application/json')
        .then(res => {
            let parsed = JSON.parse(res.text)
            dispatch(fetchUserPolls(parsed))
            console.log('poll retrieve!!',parsed)
        })
        .catch(err => {
            console.log(err)
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