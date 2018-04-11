const env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
      users: process.env.userTable,
      AUTH0_INFO: process.env.AUTH0_INFO,
      AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
      userName: process.env.DBuserName,
  };

const superagent = require('superagent');
const bcrypt = require('bcrypt');
const profile = require('../lib/profile-methods');

// const queries = require('../queries/auth');


  module.exports = (app, client, checkJwt) => {

    app.post('/api/usercreate', checkJwt, function(req, res) {
      // console.log('this is the req@@@@',req.body)
      let token = req.body.token;
      // if(!req.body.id) {
        console.log('hitting the no id sent if statement')
        if (!req.body.id) {
          //creating user
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
        } else {
        //if a user does exist.. fetchProfile...

        client.query(`SELECT * FROM ${env.users} WHERE id=($1);`,[req.body.id],
          function(err, success) {
            if (err) res.json({response: err})
            if (success) {
              console.log('successfully put in database... HERE IS THE SUCCESS', success);
              let rows = success.rows[0]
              res.json({data: rows})
            } else {
              res.status(500).json({message:"unsuccessful in putting in data..."})
            }
          })
      }

  })

}




   // client.query(`INSERT INTO ${env.users} (${env.userName}) VALUES($1) RETURNING id;`,[userName],
        //   function(err, success) {
        //     if (err) res.json({response: err})
        //     if (success) {
        //       let rows = success.rows[0]
        //       console.log('successfully put in database... HERE IS THE SUCCESS', success);
        //       res.json({data: rows})
        //     } else {
        //       res.status(500).json({message:"unsuccessful in putting in data..."})
        //     }
        //   })


  // bcrypt.hash(id, 10)
  //     .then((hash)=>{
  //       console.log('this is the HASH', hash);
  //       client.query(`INSERT INTO ${env.users}(_id) VALUES($1) ON CONFLICT DO NOTHING`,[hash],
  //         function(err, success) {
  //           if (err) res.json({response: err})
  //           if (success) {

  //             console.log('successfully put in database..');
  //             let uid
  //             res.json({data: hash})
  //           } else {
  //             res.status(500).json({message:"unsuccessful in putting in data..."})
  //           }
  //         })
  //     })
  //     .catch(err=>console.log(err))