import { combineReducers } from 'redux'
//there will be an auth, userId, and profile reducers...
import loggedIn from './auth-reducer.js'
import userProfile from './user-profile-reducer.js'
import auth0Profile from './auth0-profile-reducer.js'
import auth0Token from './auth0-token.js'

export default combineReducers({ auth0Token, userProfile, loggedIn})