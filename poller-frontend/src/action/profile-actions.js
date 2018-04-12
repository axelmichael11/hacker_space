const superagent = require('superagent');

export const setProfile = (profile) => {
  return {type: 'AUTHPROFILE', payload: profile}
}



export const profileCreate = () => (dispatch, getState) => {
    let {auth0Profile,poller_token, userId} = getState()
    console.log('profileRetrieval :: this is the token, ', poller_token)

    return superagent
      .post(`http://localhost:3000/api/user`)
      .set('Authorization', `Bearer ${poller_token}`)
      .then(res => {
        try {
          let parsed = JSON.parse(res.text)
        console.log('successfully created user in DB',parsed.data)
        return parsed.data
        } catch (err) {
          console.log(err)
        }
      })
      .catch(err => next(err))
      .then(data =>{
        console.log('HITING THE ROUTE TO AUTH0 API, THIS IS THE ID', 'IDDD', auth0Profile.sub)
        return superagent.patch(`${__AUTH0_AUDIENCE__}users/${auth0Profile.sub}`)
        .set('Authorization', `Bearer ${poller_token}`)
        //setlaskdfsadf
        .set('accept', 'application/json')
        .set('content-type', 'application/json')
        .set('scope', 'read:clients write:clients update:users_app_metadata update:users update:current_user_metadata')
        .send(JSON.stringify({ user_metadata: { uid: data.id } }))
        .then(res => {
          try {
            let parsed2 = JSON.parse(res.text)
            console.log('this is the response from the api, stored uid', parsed2);
            return parsed2;
          } catch (err) {
            console.log('THIS IS THE ERRORR FROM AUTH0 API METADATA!!!',err)
          }
          return parsed2
        })
        .catch(err => {
          console.log('THIS IS THE ERRORR FROM AUTH0 API METADATA!!!',err)
        })
      })
  }


  export const profileFetch = (uid) => (dispatch, getState) => {
    let { poller_token, auth0Profile } = getState()
    console.log('this is the token', poller_token)
    return superagent
      .post(`http://localhost:3000/api/user/${auth0Profile.user_metadata.uid}`)
      .set('Authorization', `Bearer ${poller_token}`)
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