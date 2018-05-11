const bcrypt = require('bcrypt');
const superagent = require('superagent');

const validation = require('../../lib/validation-methods')
const auth_0 = require('../../lib/authprofile-methods')
const query =  require('./explore-queries')
const pollValidate = require('./explore-validation')


const explore = {}

explore.getPolls = (req, res) => {
    let token = validation.checkForToken(req.headers.authorization)
    auth_0.getAuthProfile(token)
    .then(user=>{
      validation.validateUid(user)
      .then(user=>{
        query.getExploreQueries(res)
      })
      .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
  }


  module.exports = explore;