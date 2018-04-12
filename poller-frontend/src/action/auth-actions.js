export const login = token => {
    localStorage.setItem('poller_token', token)
    localStorage.setItem('loggedIn', token)
    // console.log('LOCAL STORAGE', localStorage)
    return {
      type: 'LOGIN',
      payload: token,
    }
  }

  
  export const logout = () => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('poller_token')
    localStorage.removeItem('reduxPersist:auth')
    //might need these later... need to research redux persist
    localStorage.removeItem('reduxPersist:userId')
    localStorage.removeItem('reduxPersist:profile')
    localStorage.removeItem('reduxPersist:userInfo')

    localStorage.setItem('userInfo', null)
    localStorage.setItem('poller_token', null)
    return { type: 'LOGOUT' }
  }