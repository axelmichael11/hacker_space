const bcrypt = require('bcrypt');
const superagent = require('superagent');

const validation = require('../../lib/validation-methods')
const auth_0 = require('../../lib/authprofile-methods')
const query =  require('./profile-queries')


const profile = {};

    profile.fetchProfile = (req, res) => {
      let token = validation.checkForToken(req.headers.authorization)
      auth_0.getAuthProfile(token)
      .then(user=>{
        validation.validateUid(user)
        .then(user=>{
          query.fetchProfileQuery(res, user)
        })
        .catch(err=>console.log(err))
      })
      .catch(err=>console.log('error extracting user from auth 0',err))
    }

module.exports = profile;

