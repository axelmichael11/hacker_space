export const setAuthToken = (token) => {
    console.log('this is auth Token', token)
    localStorage.setItem('poller_token', token)
    return {type: 'AUTH0TOKEN', payload: token}
}
