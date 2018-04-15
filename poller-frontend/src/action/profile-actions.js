const superagent = require('superagent');
// const request = require('request');

import {setAuthToken,setAuth0Profile } from './auth0-actions.js'




  export const profileFetch = () => (dispatch, getState) => {
    let { auth0Token } = getState()
    console.log('this is the api url AND TOKEN', __API_URL__, auth0Token)
    return superagent
      .get(`${__API_URL__}/api/user`)
      .set('Authorization', `Bearer ${auth0Token}`)
      .then(res => {
        try {
          let parsed = JSON.parse(res.text)
        console.log('successfully created user in DB',parsed)
        return parsed
        } catch (err) {
          console.log(err)
        }
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