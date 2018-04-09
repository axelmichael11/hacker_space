const superagent = require('superagent');


export const profileCreateRequest = (profile) => (dispatch, getState) => {
    let { authReducer } = getState()
    console.log('this is the token', authReducer)
    return superagent
      .post(`http://localhost:3000/api/usercreate`)
      .set('Authorization', `Bearer ${authReducer}`)
      .send(profile)
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


  export const checkProfileExists = (sub) => (dispatch, getState) => {
    let { authReducer } = getState()
    console.log('this is the token', authReducer)
    return superagent
      .get(`http://localhost:3000/api/user`)
      .set('Authorization', `Bearer ${authReducer}`)
      .send(sub)
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