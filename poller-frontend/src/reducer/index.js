import { combineReducers } from 'redux'
//there will be an auth, userId, and profile reducers...
import authReducer from './auth-reducer.js'
import userIdReducer from './user-id-reducer.js'


export default combineReducers({ authReducer, userIdReducer})