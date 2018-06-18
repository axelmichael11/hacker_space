const superagent = require('superagent');




  export const pollDelete = (poll) => (dispatch, getState) => {
    let { auth0Token } = getState();
    return superagent
        .delete(`${__API_URL__}/api/poll`)
        .set('Authorization', `Bearer ${auth0Token}`)
        .send(poll)
        .then(res => {
          if (res.status === 200){
            return res.status 
          }else {
            throw new Error(res.status)
          }
        })
        .catch(err => {
          console.log('this is the error', err)
          return err
        })
  }