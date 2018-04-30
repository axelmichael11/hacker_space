const env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
      users: process.env.userTable,
      AUTH0_INFO: process.env.AUTH0_INFO,
      AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
      userName: process.env.DBuserName,
      AUTH0_SIGNUP_CALLBACK_URL: process.env.AUTH0_SIGNUP_CALLBACK_URL,
      AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
      uid: process.env.uid
  };

const superagent = require('superagent');
const bcrypt = require('bcrypt');
const profile = require('../lib/profile-methods');

const queries = require('../queries/auth');


  module.exports = (app, client, checkJwt) => {

    app.post('/api/user',checkJwt, (req,res) => {
      if (!req.headers.authorization) {
        res.json({message:'no authorization token found!'})
      } else {
        let token = req.headers.authorization
        profile.getInfo(token)
        .then(user => {
          console.log('this is the user!', user)
          if (user[`${env.uid}`]) {
            client.query(`INSERT INTO ${env.users}(id) VALUES($1) RETURNING *;`,
            [
              user[`${env.uid}`]
            ],
            function(err, success) {
              if (err) res.json({response: err})
              if (success) {
                  console.log('this is the db success', success)
                  let sendProfile = profile.formatSendProfile(success.rows[0], user)
                  console.log('this is the final profile to send back', sendProfile)
                  res.json(sendProfile)
              } else {
                res.status(500).json({message:"unsuccessful storing user in the database"})
              }
            })
          } else {
            res.json({error:'there is an error finding your id in auth0!'})
          }
        })
        .catch(err=>console.log(err))
      }
    })


    app.get('/api/user',checkJwt, (req,res) => {
      if (!req.headers.authorization) {
        res.json({message:'no authorization token found!'})
      } else {
        let token = req.headers.authorization
        profile.getInfo(token)
        .then(user => {
          console.log('this is the user!', user)
          if (user[`${env.uid}`]) {
            client.query(`SELECT * FROM ${env.users} WHERE id=($1);`, 
            [user[`${env.uid}`]],
            function(err, success) {
              if (err) res.status(500).json({message:"unsuccessful in putting in data..."})
              if (success) {
              console.log('DB query success', success.rows[0]);
                let sendProfile = profile.formatSendProfile(success.rows[0], user)
                res.json(sendProfile)
              } else {
                res.status(500).json({message:"unsuccessful finding you in our records..."})
              }
            })
          } else {
            res.json({error:'there is an error finding your id in auth0!'})
          }
        })
        .catch(err=>console.log(err))
      }
    })



  app.put('/api/user', checkJwt, (req, res) => {
    console.log('UPDATE REQEUST@@@@@@@') 
    if (!req.headers.authorization) {
      res.json({message:'no authorization token found!'})
    } else {
      let incomingProfileInfo = req.body
      let profileInfo = profile.userProfileValidate(incomingProfileInfo)
      let token = req.headers.authorization
      profile.getInfo(token)
        .then(user => {
          console.log('this is the USER FROM INFO', user)
          if (!user[`${env.uid}`]) {
            res.json({error:'there is an error finding your id! log out and create another account'})
          } else {
            client.query(`UPDATE ${env.users}
              SET age=($1),
              ethnicity=($2),
              profession=($3),
              religion=($4),
              gender=($5),
              country=($6)
              WHERE id=($7) 
              RETURNING age, ethnicity, profession, religion, gender, country;`,
              [profileInfo.age,
              profileInfo.ethnicity,
              profileInfo.profession,
              profileInfo.religion,
              profileInfo.gender,
              profileInfo.country,
              user[`${env.uid}`],
              ],
              function(err, success) {
                if (err) res.json({response: err})
                if (success) {
                  let sendProfile = profile.formatSendProfile(success.rows[0], user)
                  res.json(sendProfile)
                } else {
                  res.status(500).json({message:"unsuccessful updating user profile"})
                }
              }
            )
          }
      }).catch(err=>res.json({error: err}))
    }
  })

  app.delete('/api/user', checkJwt, (req,res) => {
    if (!req.headers.authorization) {
      res.json({message:'no authorization token found!'})
    } else {

      client.query(`DELETE FROM ${env.users}
        WHERE id=($1);`,
        [uid],
        function(err, success) {
          if (err) res.json({response: err})
          if (success) {
            console.log('successfully deleted from the database in database... HERE IS THE SUCCESS', success);
            res.json({data: 'USER DELETED FROM DB'})
          } else {
            console.log(err);
            res.status(500).json({message:"unsuccessful in putting in data..."})
          }
        }
      )
    }
  })
}