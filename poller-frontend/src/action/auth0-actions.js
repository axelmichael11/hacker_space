export const setAuth0Profile = (profile) => {
    console.log('this is the AUTH0 profile!!!', profile)
    localStorage.setItem('userInfo', JSON.stringify(profile))
    return {type: 'AUTH0PROFILE', payload: profile}
}