const superagent = require('superagent');
// const request = require('request');

import {setAuthToken,setAuth0Profile } from './auth0-actions.js'

import {storeUserProfile} from './user-profile-actions'

import {login} from './auth-actions.js'

  export const profileFetch = () => (dispatch, getState) => {
    let { auth0Token } = getState()
    if (!auth0Token) {
      auth0Token = localStorage.poller_token
    }
    console.log('this is the api url AND TOKEN', __API_URL__, auth0Token)
    return superagent
      .get(`${__API_URL__}/api/user`)
      .set('Authorization', `Bearer ${auth0Token}`)
      .then(res => {
        try {
          let parsed = JSON.parse(res.text)
        console.log('got the user...',parsed)
        dispatch(storeUserProfile(parsed))
        dispatch(login())
        return parsed
        } catch (err) {
          console.log(err)
        }
      })
      .catch(err => console.log(err))
  }


export const profileUpdate = (profile) => (dispatch, getState) => {
  let { auth0Token } = getState();
  return superagent
      .put(`${__API_URL__}/api/user`)
      .set('Authorization', `Bearer ${auth0Token}`)
      .send(profile)
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