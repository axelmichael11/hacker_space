export const setAuthToken = (token) => {
    // localStorage.setItem('poller_token', token)
    return {type: 'AUTH0TOKEN', payload: token}
}



