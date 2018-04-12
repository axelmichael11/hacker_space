import { combineReducers } from 'redux'
//there will be an auth, userId, and profile reducers...
import poller_token from './auth-reducer.js'
import userProfile from './user-profile-reducer.js'
import auth0Profile from './auth0-profile-reducer.js'

export default combineReducers({ poller_token, userProfile, auth0Profile})