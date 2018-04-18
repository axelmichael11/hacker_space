import {login} from './auth-actions'

export const storeUserProfile = (userProfile) => {
  localStorage.setItem('userInfo', JSON.stringify(userProfile))
    return { type: 'user_profile', payload: userProfile }
  }