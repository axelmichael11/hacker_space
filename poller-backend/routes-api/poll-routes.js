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
      uid: process.env.uid,
      questions_table: process.env.questions_table,
  };


const superagent = require('superagent');
const bcrypt = require('bcrypt');
const poll = require('../lib/poll-methods');
const profile = require('../lib/profile-methods')
const queries = require('../queries/auth');


  module.exports = (app, client, checkJwt) => {



  app.post('/api/poll', checkJwt, (req,res) => {
    if (!req.headers.authorization || !req.body) {
      res.json({message:'no authorization token  or body found!'})
    } else {
      
      let validatedPoll = poll.userPollValidate(req.body)
      let token = req.headers.authorization
      profile.getInfo(token)
      .then(user => {
        console.log('this is the user!', user,'this is the poll data', validatedPoll)
        if (!user[`${env.uid}`]) {
          res.json({error:'there was an error identifying you'})
        } else {
          client.query(`
          WITH poll AS (INSERT INTO polls (author_id, author_username, subject, question)
          VALUES ($1, $2, $3, $4) RETURNING id, author_id)
          UPDATE poller_data SET polls_id = array_append(polls_id, poll.id) 
          FROM poll WHERE poller_data.id=poll.author_id;
          `,
          [user[`${env.uid}`],
          user.nickname,
          validatedPoll.pollSubject,
          validatedPoll.pollQuestion,
          ],
          function(err, success) {
            if (success && success.command==='UPDATE' && success.rowCount== 1) {
              res.status(200).json('Success')
            } else {
              if (err.name =='error' && err.constraint=='poller_data_polls_id_check') {
                console.log('err.name', err.name)
                res.status(550).send(err)
              } else {
                res.status(500).send({message: err.name})
              }
            }
          })
        }
      })
      .catch(err=>{
        console.log('no user found sdfsdfsdfsdfsd', err )
        res.json({error:err})
      })
      // console.log('this is the validated poll', validatedPoll)
   
    }
  })


  app.get('/api/poll',checkJwt, (req,res) => {
    if (!req.headers.authorization) {
      res.json({message:'no authorization token found!'})
    } else {
      let token = req.headers.authorization
      profile.getInfo(token)
      .then(user => {
        if (!user[`${env.uid}`]) {
          client.query(`INSERT INTO ${env.users} DEFAULT VALUES RETURNING *;`,
          function(err, success) {
            if (err) res.json({response: err})
            if (success) {
              console.log('success', success.rows[0]);
              profile.sendId(user.sub, token, {id: success.rows[0]['id']})
              .then(user => {
                let sendProfile = profile.formatSendProfile(success.rows[0], user)
                res.json(sendProfile)
              })
              .catch(err => console.log(err))
            } else {
              res.status(500).json({message:"unsuccessful with DB query"})
            }
          })
        } else {
          client.query(`SELECT * FROM ${env.users} WHERE id=($1);`, 
          [user[`${env.uid}`]],
          function(err, success) {
            if (err) res.status(500).json({message:"unsuccessful in putting in data..."})
            if (success) {
            console.log('DB query success', success.rows[0]);
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

  app.put('/api/poll', checkJwt, (req, res) => {
    console.log('UPDATE REQEUST@@@@@@@') 
    if (!req.headers.authorization) {
      res.json({message:'no authorization token found!'})
    } else {
      let incomingProfileInfo = req.body
      let profileInfo = profile.userProfileValidate(incomingProfileInfo)
      let token = req.headers.authorization
      profile.getInfo(token)
        .then(user => {
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

  app.delete('/api/poll', checkJwt, (req,res) => {
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