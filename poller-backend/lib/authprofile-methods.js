
const superagent = require('superagent');

module.exports = {
        getAuthProfile : (token) => {
        return superagent.get(`https://${process.env.AUTH0_DOMAIN}/userinfo`)
            .set('Authorization',`${token}`)
            .set('scope','openid profile email read write user_metadata userId')
            .then((response)=>{
            return response.body
            })
            .catch(err=> console.log('error',err))
    }
}