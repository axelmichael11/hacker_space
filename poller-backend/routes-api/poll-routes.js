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
          VALUES ($1, $2, $3, $4) RETURNING created_at, id, author_id, subject, question, author_username)
          UPDATE poller_data SET polls_id = array_append(polls_id, poll.id) 
          FROM poll WHERE poller_data.id=poll.author_id
          RETURNING poll.author_username, poll.created_at, poll.subject, poll.question;
          `,
          [user[`${env.uid}`],
          user.nickname,
          validatedPoll.pollSubject,
          validatedPoll.pollQuestion,
          ],
          function(err, success) {
            if (success && success.command==='UPDATE' && success.rowCount== 1) {
              console.log('SUCCESS, these are the rows', success.rows[0])
              res.status(200).json(success.rows[0])
            } else {
              if (err.name =='error' && err.constraint=='poller_data_polls_id_check') {
                console.log('err.name', err)
                res.status(550).send({error: err.name})
              } else {
                console.log('this is ther ror', err)
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
            RETURNING id, author_id, created_at
          )
          UPDATE poller_data SET polls_id = array_remove(polls_id, poll.id) from poll WHERE poller_data.id=poll.author_id
          RETURNING poll.created_at;`,
          [user[`${env.uid}`],
          validatedPoll.created_at,
          ],
          function(err, success) {
            if (success) {
              if (success.rows[0]){
                console.log('SUCCESS', success.rows[0])
                let pollToDelete = poll.formatPollDeleteSend(success.rows[0])
                res.status(200).json(pollToDelete)
              }
              if (success.rowCount==0){
                console.log('success, not returning anything', success)
                res.status(401).json({message:'poll was not found'})
              } 
              // else {
              // console.log('success', success)
              // res.status(500).json({error:'Internal server error'})
              // }
            } 
            else {
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
          SELECT question, subject, author_username, created_at from polls WHERE author_id=($1)
           `,
          [
            user[`${env.uid}`],
          ],
          function(err, success) {
            if (success) {
              console.log('this is success from db', success)
              res.status(200).send(success.rows)
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