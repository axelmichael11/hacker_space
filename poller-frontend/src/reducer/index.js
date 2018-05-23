import { combineReducers } from 'redux'
//there will be an auth, userId, and profile reducers...
import loggedIn from './auth-reducer.js'
import userProfile from './user-profile-reducer.js'
import auth0Token from './auth0-token.js'
import storageLoginAttempt from './storage-Login.js'
import userPolls from './user-polls-reducer.js'
import publicPolls from './public-polls-reducer.js'
import error from './error-reducer'
import Loading from './loading-reducer.js'
export default combineReducers({ publicPolls, userPolls, auth0Token, userProfile, loggedIn, storageLoginAttempt, Loading, error})