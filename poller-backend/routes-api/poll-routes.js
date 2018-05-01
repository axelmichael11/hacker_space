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
        if (user[`${env.uid}`]) {
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
                console.log('err.name', err)
                res.status(550).send({error: err.name})
              } else {
                res.status(500).send({message: err.name})
              }
            }
          })
        } else {
          res.json({error:'there was an error identifying you'})
        }
      })
      .catch(err=>{
        console.log('no user found sdfsdfsdfsdfsd', err )
        res.json({error:err})
      })
      // console.log('this is the validated poll', validatedPoll)
   
    }
  })



  app.delete('/api/poll', checkJwt, (req,res) => {
    if (!req.headers.authorization || !req.body) {
      res.json({message:'no authorization token  or body found!'})
    } else {
      let validatedPoll = poll.deletePollValidate(req.body)
      let token = req.headers.authorization
      profile.getInfo(token)
      .then(user => {
        console.log('this is the user!', user,'this is the poll data', validatedPoll)
        if (user[`${env.uid}`]) {
          client.query(`
          WITH poll AS (
            DELETE FROM polls WHERE created_at=($2) AND author_id=($1)
            RETURNING id, author_id
          )
          UPDATE poller_data SET polls_id = array_remove(polls_id, poll.id) from poll WHERE poller_data.id=poll.author_id;
          `,
          [user[`${env.uid}`],
          validatedPoll.timeStamp,
          ],
          function(err, success) {
            if (success) {
              res.status(200).json('Success')
            } else {
              if (err.name =='error') {
                console.log('err.name', err)
                res.status(500).send({error: err.name})
              }
            }
          })
        } else {
          res.json({error:'there was an error identifying you'})
        }
      })
      .catch(err=>{
        console.log('no user found sdfsdfsdfsdfsd', err )
        res.json({error:err})
      })
      // console.log('this is the validated poll', validatedPoll)
   
    }
  })

  app.get('/api/poll', checkJwt, (req,res) => {
    if (!req.headers.authorization || !req.body) {
      res.json({message:'no authorization token  or body found!'})
    } else {
      let token = req.headers.authorization
      profile.getInfo(token)
      .then(user => {
        if (user[`${env.uid}`]) {
          client.query(`
          SELECT question, subject, author_id, created_at from polls WHERE author_id=($1)
           `,
          [
            user[`${env.uid}`],
          ],
          function(err, success) {
            if (success) {
              console.log('this is success from db', success)
              let pollsResponse = poll.formatPollSend(success.rows[0])
              res.status(200).json(pollsResponse)
            } else {
              if (err) {
                console.log('err.name', err)
                res.status(500).send({error: err})
              }
            }
          })
        } else {
          res.json({error:'there was an error identifying you'})
        }
      })
      .catch(err=>{
        console.log('no user found sdfsdfsdfsdfsd', err )
        res.json({error:err})
      })
      // console.log('this is the validated poll', validatedPoll)
   
    }
  })


}