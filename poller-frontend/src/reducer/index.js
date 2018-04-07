import { combineReducers } from 'redux'
//there will be an auth, userId, and profile reducers...
import authReducer from './auth-reducer.js'
import userIdReducer from './user-id-reducer.js'
import profile from './profile-reducer.js'

export default combineReducers({ authReducer, userIdReducer, profile})