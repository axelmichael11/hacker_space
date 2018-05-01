const superagent = require('superagent');


export const pollSend = (poll) => (dispatch, getState) => {
    let { auth0Token } = getState();
    return superagent
        .post(`${__API_URL__}/api/poll`)
        .set('Authorization', `Bearer ${auth0Token}`)
        .send(poll)
        .then(res => {
          console.log('this is the status', res.status)
          if (res.status >=550){
            throw new Error(res.status)
          }
          return parsed
        })
        .catch(err => {
          if (err.status == 550){
            throw new Error(550)
          }
        })
  }