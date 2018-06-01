const superagent = require('superagent');


export const pollSend = (poll) => (dispatch, getState) => {
    let { auth0Token } = getState();
    return superagent
        .post(`${__API_URL__}/api/poll`)
        .set('Authorization', `Bearer ${auth0Token}`)
        .send(poll)
        .then(res => {
          console.log('this is the status', res.status)
          if (res.status === 200){
            return res.status 
          }
          if (res.status===550){
            throw new Error(550)
          }
        })
        .catch(err=>{
          console.log('this is the rror', err)
        })
  }


  export const pollDelete = (poll) => (dispatch, getState) => {
    let { auth0Token } = getState();
    return superagent
        .delete(`${__API_URL__}/api/poll`)
        .set('Authorization', `Bearer ${auth0Token}`)
        .send(poll)
        .then(res => {
          console.log('this is the response', res.status, res)

          return res
        })
        .catch(err => {
          console.log('this is the error', err)
          return err
        })
  }