import { combineReducers } from 'redux'
//there will be an auth, userId, and profile reducers...
import poller_token from './auth-reducer.js'
import userId from './user-id-reducer.js'
import profile from './profile-reducer.js'

export default combineReducers({ poller_token, userId, profile})