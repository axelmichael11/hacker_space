export const login = () => (dispatch, getState) => {
  let {auth0Token} = getState();
    localStorage.setItem('poller_token', auth0Token)
    // console.log('LOCAL STORAGE', localStorage)
    return {
      type: 'LOGIN',
      payload: auth0Token,
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