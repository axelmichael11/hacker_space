const superagent = require('superagent');

const fetchPublicPolls = (polls) => {
    return { type: 'public_polls_fetch', payload: polls }
  }


export const getPublicPolls = () => (dispatch, getState) => {
    let { auth0Token } = getState();

    return superagent.get(`${__API_URL__}/api/explore`)
    .set('Authorization', `Bearer ${auth0Token}`)
    .then(res => {
        let parsed = JSON.parse(res.text)
        console.log(parsed)
        dispatch(fetchPublicPolls(parsed))
    })
    .catch(err => {
        if (err.status == 550){
        throw new Error(550)
        } 
    })
}