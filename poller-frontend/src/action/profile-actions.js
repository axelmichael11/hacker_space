const superagent = require('superagent');
// const request = require('request');

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
      .catch(err => console.log(err))
      .then(data =>{
        console.log('HITING THE ROUTE TO AUTH0 API, THIS IS THE ID', 'IDDD', auth0Profile.sub)
        return superagent.patch(`${__AUTH0_AUDIENCE__}users/${auth0Profile.sub}`)
        .set('Authorization', `Bearer ${poller_token}`)
        // .set("Access-Control-Allow-Origin", "*")
        // .set('accept', 'application/json')
        .set('Content-Type', 'application/json')
        .withCredentials()
        .set('scope', 'openid email profile ')
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


  export const profileFetch = () => (dispatch, getState) => {
    let { poller_token } = getState()
    console.log('this is the token', poller_token)
    return superagent
      .get(`http://localhost:3000/api/user`)
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



  export const profileCreate2 = () => (dispatch, getState) => {
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
      .catch(err => console.log(err))
      .then(data =>{
        console.log('HITING THE ROUTE TO AUTH0 API, THIS IS THE ID', 'IDDD', auth0Profile.sub)

        var options = { method: 'POST',
        url: `${__AUTH0_AUDIENCE__}users/${auth0Profile.sub}`,
        headers: 
        { 'content-type': 'application/json',
          authorization: `Bearer ${poller_token}` },
        body: {  user_metadata: { id: data.id } },
        json: true };

        return request(options, function (error, response, body) {
          if (error) throw new Error(error);

          console.log(body);
        });
      })
      .catch(error=>console.log(error));
  }