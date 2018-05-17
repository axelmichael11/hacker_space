const superagent = require('superagent');
// const request = require('request');

import {setAuthToken,setAuth0Profile } from './auth0-actions.js'

import {storeUserProfile} from './user-profile-actions'

import {login} from './auth-actions.js'

  export const profileFetch = () => (dispatch, getState) => {
    let { auth0Token } = getState()
    console.log('this is the api url AND TOKEN', __API_URL__, auth0Token)
    return superagent
      .get(`${__API_URL__}/api/user`)
      .set('Authorization', `Bearer ${auth0Token}`)
      .then(res => {
        let parsed = JSON.parse(res.text)
        console.log('got the user...',parsed)
        localStorage.setItem('poller_token', auth0Token)
        dispatch(storeUserProfile(parsed))
        dispatch(login())
        return parsed
      })
      .catch(err => {
        console.log(err)
      })
  }


  export const localStorageProfileFetch = () => (dispatch, getState) => {
    let auth0Token = localStorage.poller_token
    console.log('this is the api url AND TOKEN', __API_URL__, auth0Token)
    return superagent
      .get(`${__API_URL__}/api/user`)
      .set('Authorization', `Bearer ${auth0Token}`)
      .then(res => {
        let parsed = JSON.parse(res.text)
        console.log('got the user...',parsed)
        dispatch(storeUserProfile(parsed))
        dispatch(login())
        return parsed
      })
      .catch(err => {
        console.log(err)
      })
  }


export const profileUpdate = (profile) => (dispatch, getState) => {
  let { auth0Token } = getState();
  return superagent
      .put(`${__API_URL__}/api/user`)
      .set('Authorization', `Bearer ${auth0Token}`)
      .send(profile)
      .then(res => {
        let parsed = JSON.parse(res.text)
        dispatch(storeUserProfile(parsed))
        console.log('thsi is the resposne!',parsed)
      })
      .catch(err => {
        console.log('thsi is the error!',err)

        if (err.status == 500){
          throw err.status
        } 
      })
}