export const setAuthToken = (token) => {
    console.log('this is auth Token', token)
    // localStorage.setItem('userInfo', JSON.stringify(profile))
    return {type: 'AUTH0TOKEN', payload: token}
}

export const setAuth0Profile = (profile) => {
    console.log('this is auth Token', profile)
    // localStorage.setItem('userInfo', JSON.stringify(profile))
    return {type: 'AUTH0PROFILE', payload: profile}
}
