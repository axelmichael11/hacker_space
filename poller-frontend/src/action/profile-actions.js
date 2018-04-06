const superagent = require('superagent');


export const profileCreateRequest = (profile) => (dispatch, getState) => {
    let { authReducer } = getState()
    console.log('this is the token', authReducer)
    return superagent
      .get(`http://localhost:3000/api/signup`)
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