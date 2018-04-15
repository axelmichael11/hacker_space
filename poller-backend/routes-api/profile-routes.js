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

  };

const superagent = require('superagent');
const bcrypt = require('bcrypt');
const profile = require('../lib/profile-methods');

// const queries = require('../queries/auth');


  module.exports = (app, client, checkJwt) => {

    // app.get('/api/callback/signup', (req, res) => {
    //   if(!req.query.code) {
    //     // user has denied access
    //     console.log('there isnt any code!!')
    //     res.redirect(process.env.CLIENT_URL)
    //   } else {
    //     superagent.post(`${env.AUTH0_DOMAIN}/oauth/token`)
    //     .type('form')
    //     .send({
    //       code: req.query.code,
    //       grant_type: 'authorization_code',
    //       client_id: env.AUTH0_CLIENT_ID,
    //       client_secret: env.AUTH0_CLIENT_SECRET,
    //       redirect_uri: `http://localhost:8080`,
    //     })
    //     .then(response => {
    //       console.log('auth0 token data', response.body)
    //       // get the user profile
          
    //     })
    //     .catch(err=>console.log(err))
    //   }
    // })



    app.get('/api/user', (req,res) => {
      console.log('this is the request###############',req.headers.authorization) //i think is this in req.header...
      // res.json({message:'suuppp dude!'})

      if (!req.headers.authorization) {
        res.json({message:'no authorization token found!'})
      } else {
        let token = req.headers.authorization

        console.log('this is the access token', token)
        return superagent.get(`https://app92927396.auth0.com/userinfo`)
        .set('Authorization',`${token}`)
        .set('scope','openid profile email read write')
        .then((response)=>{
          console.log('this is the user!', response.body);
          return response.body
        })
        .catch(err=> console.log('ERROEOOWEFER',err))
        .then(user => {
          let userAndId;

          if (!user.metadata) {

            client.query(`INSERT INTO ${env.users} DEFAULT VALUES RETURNING id;`,
          function(err, success) {
            if (err) res.json({response: err})
            if (success) {
              let rows = success.rows[0]
              console.log('successfully put in database... HERE IS THE SUCCESS', rows);
              profile.sendId(user.sub, token, rows)

            

            } else {
              res.status(500).json({message:"unsuccessful in putting in data..."})
            }
          })
          // .then(rows=>{
          //   console.log('HITING THE DON"T HAVE METADAT######', rows,token)

          //   //create a method for this...
        }
      })
      .catch(err=>console.log(err))



      }

      // client.query(`SELECT * FROM ${env.users} WHERE id=($1);`,[uid],
      //     function(err, success) {
      //       if (err) res.json({response: err})
      //       if (success) {
      //         console.log('successfully put in database... HERE IS THE SUCCESS', success.rows[0]);
      //         let rows = success.rows[0]
      //         res.json({data: rows})
      //       } else {
      //         res.status(500).json({message:"unsuccessful in putting in data..."})
      //       }
      //     })


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