export const setAuthToken = (token) => {
    console.log('SETTING THE AUTH TOKENNNNNNNNN ######', token)
    // localStorage.setItem('poller_token', token)
    return {type: 'AUTH0TOKEN', payload: token}
}



