const env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
      users: process.env.userTable,
      AUTH0_INFO: process.env.AUTH0_INFO,
      AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE
  };

const superagent = require('superagent');
const bcrypt = require('bcrypt');
const profile = require('../lib/profile-methods');


  module.exports = (app, client, checkJwt) => {

    app.post('/api/usercreate', checkJwt, function(req, res) {
      console.log('this is the req@@@@',req.body, req.params);
      let id = req.body.id;
      let token = req.body.token;
      let profile;
      bcrypt.hash(id, 10)
      .then((hash)=>{
        console.log('this is the HASH', hash);
        client.query(`INSERT INTO ${env.users}(_id) VALUES($1) ON CONFLICT DO NOTHING`,[hash],
          function(err, success) {
            if (err) res.json({response: err})
            if (success) {
              console.log('successfully put in database... going out now to put hash in meta',success);

              return superagent.patch(`${env.AUTH0_AUDIENCE}users/${id}`)
              .set('Authorization', `Bearer ${token}`)
              .set('scope', 'openid profile update:users_app_metadata update:users update:current_user_metadata')
              .set('accept', 'application/json')
              .set('content-type', 'application/json')
              .send(JSON.stringify({ user_metadata: { profileId: hash } }))
              .then(response => {
                try {
                  let parsed = JSON.parse(response.text)
                  console.log('SUCCESS PUT THE HASH');
                  profile = parsed
                  return parsed
                } catch (err) {
                  console.log(err)
                }
              })
              .then((parsed)=>{
                res.json({success1:parsed})
              })
            }
            res.json({success2:profile})
          })
          console.log('OUTSIDE OF TRY CATCH, INSIDE OF SUCCESS in query...!!!@@@', profile)
              res.json({success2: profile})
      })
      .catch(err=>console.log(err))

      res.json({success3:profile})
    })
 
    }