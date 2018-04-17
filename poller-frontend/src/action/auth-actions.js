export const login = () => {
    return {
      type: 'LOGIN',
      payload: true,
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
    return { type: 'LOGOUT' }
  }