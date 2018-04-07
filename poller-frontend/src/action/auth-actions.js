export const login = token => {
    localStorage.setItem('poller_token', token)
    console.log('LOCAL STORAGE', localStorage)
    return {
      type: 'LOGIN',
      payload: token,
    }
  }
  export const logout = () => {
    localStorage.setItem('poller_token', null)
    return { type: 'LOGOUT' }
  }