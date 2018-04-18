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

    app.get('/api/user',checkJwt, (req,res) => {
      console.log('this is the request###############',req.headers.authorization) //i think is this in req.header...
      // res.json({message:'suuppp dude!'})

      if (!req.headers.authorization) {
        res.json({message:'no authorization token found!'})
      } else {
        let token = req.headers.authorization
        profile.getInfo(token)
        .then(user => {
          console.log('GET INFO RESPONSE', user)
          if (!user[`${env.uid}`]) {
            client.query(`INSERT INTO ${env.users} DEFAULT VALUES RETURNING *;`,
            function(err, success) {
              if (err) res.json({response: err})
              if (success) {
                console.log('successfully put in database... HERE IS THE SUCCESS', success.rows[0], success.rows[0]['id']);
                profile.sendId(user.sub, token, {id: success.rows[0]['id']})
                .then(user => {
                  console.log('USER', user)
                  let sendProfile = profile.formatSendProfile(success.rows[0], user)
                  res.json(sendProfile)
                })
                .catch(err => console.log(err))
              } else {
                res.status(500).json({message:"unsuccessful in putting in data..."})
              }
            })
          } else {
            client.query(`SELECT * FROM ${env.users} WHERE id=($1);`, [user[`${env.uid}`]],
            function(err, success) {
              if (err) res.status(500).json({message:"unsuccessful in putting in data..."})
              if (success) {
                console.log('successfully retrieved profile... HERE IS THE SUCCESS', success.rows[0], success.rows[0]['id']);
                  let sendProfile = profile.formatSendProfile(success.rows[0], user)
                  res.json(sendProfile)
              } else {
                res.status(500).json({message:"unsuccessful in putting in data..."})
              }
            })

          }
        })
        .catch(err=>console.log(err))
      }
    })






    app.post('/api/user', checkJwt, function(req, res) {
        console.log('hitting the no id sent if statement')
          client.query(`INSERT INTO ${env.users} DEFAULT VALUES RETURNING id;`,
          function(err, success) {
            if (err) res.json({response: err})
            if (success) {
              let rows = success.rows[0]
              console.log('successfully put in database... HERE IS THE SUCCESS', success);
              res.json({data: rows})
            } else {
              res.status(500).json({message:"unsuccessful in putting in data..."})
            }
          })
  })

  app.put('/api/user', checkJwt, (req, res) => {
    let uid = req.body.uid
    let incomingProfileInfo = req.body
    let profileInfo = profile.userProfileValidate(incomingProfileInfo)

    client.query(`UPDATE ${env.users}
    SET age=($1),
    eth=($2),
    prof=($3),
    rel=($4),
    gen=($5),
    country=($6)
    WHERE id=($7) RETURNING age , eth, prof, rel, gen, country;`,
      [profileInfo.age,
      profileInfo.ethnicity,
      profileInfo.profession,
      profileInfo.religious,
      profileInfo.gender,
      profileInfo.country,
      uid
      ],
          function(err, success) {
            // if (err) res.json({response: err})
            if (success) {
              console.log('successfully put in database... HERE IS THE SUCCESS', success.rows[0]);
              let rows = success.rows[0]
              res.json({data: rows})
            } else {
              console.log(err);
              res.status(500).json({message:"unsuccessful in putting in data..."})
            }
          })
  })

  app.delete('/api/user', checkJwt, (req,res) => {
    let uid = req.body.uid
    client.query(`DELETE FROM ${env.users}
    WHERE id=($1);`,
      [
      uid
      ],
          function(err, success) {
            // if (err) res.json({response: err})
            if (success) {
              console.log('successfully deleted from the database in database... HERE IS THE SUCCESS', success);
              res.json({data: 'USER DELETED FROM DB'})
            } else {
              console.log(err);
              res.status(500).json({message:"unsuccessful in putting in data..."})
            }
          })
  })



}