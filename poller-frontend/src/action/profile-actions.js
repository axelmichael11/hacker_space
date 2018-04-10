const superagent = require('superagent');

export const setProfile = (profile) => {
  return {type: 'AUTHPROFILE', payload: profile}
}

export const databaseProfile = (profile) => {
  return {type: 'PROFILE', payload: profile}
}



export const profileCreate = () => (dispatch, getState) => {
    let {auth0Profile,poller_token, userId} = getState()
    console.log('profileRetrieval :: this is the token, ', poller_token)

    return superagent
      .post(`http://localhost:3000/api/usercreate`)
      .set('Authorization', `Bearer ${poller_token}`)
      .send({id: userId})
      .then(res => {
        try {
          let parsed = JSON.parse(res.text)
        console.log('res.body FROM THE PROFILE CREATE METHOD, should be a hash',parsed)
        return parsed
        } catch (err) {
          console.log(err)
        }
      })
      .catch(err => console.log(err))
      .then(parsed =>{
        return superagent.post(`${__AUTH0_AUDIENCE__}users/${userId}`)
        .set('Authorization', `Bearer ${poller_token}`)
        .set('accept', 'application/json')
        .set('content-type', 'application/json')
        .send(JSON.stringify({ user_metadata: { profile: parsed.hashId } }))
        .then(res => {
          console.log('update profile in auth0!', res)
          return res
        })
        .catch(err => {
          console.log(err)
        })
      })

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