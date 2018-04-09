const superagent = require('superagent');


export const profileRetrieval = (profile) => (dispatch, getState) => {
    let { puller_token, id } = getState()
    console.log('this is the token', puller_token)
    return superagent
      .post(`http://localhost:3000/api/usercreate`)
      .set('Authorization', `Bearer ${puller_token}`)
      .send({
        'id':id
      })
      .then(res => {
        try {
          let parsed = JSON.parse(res.text)
        //   dispatch(profileFetch(parsed.user_metadata.profile))
        console.log('res.body',parsed)
        } catch (err) {
          console.log(err)
        }
        return res
      })
      .catch(err => console.log(err))
  }


  export const checkProfileExists = () => (dispatch, getState) => {
    let { poller_token, userId } = getState()
    console.log('this is the token', poller_token)
    return superagent
      .get(`http://localhost:3000/api/user`)
      .set('Authorization', `Bearer ${poller_token}`)
      .send({'id':userId})
      .then(res => {
          console.log('this is the response from database', res.body)
          if (res.body === null){
              return {type: 'profile', payload: false}
          } else {
              return {type: 'profile', payload: res.body}
          }
          return;
      })
      .catch(err => console.log(err))
  }