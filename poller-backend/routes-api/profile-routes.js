const env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
      users: process.env.userTable
  };

const bcrypt = require('bcrypt');
const profile = require('../lib/profile-methods');

  module.exports = (app, client, checkJwt) => {
    app.post('/api/usercreate', checkJwt, function(req, res) {
      console.log('this is the req.body', req.body);
      createUser(req.body)
      .then((user)=>{
        res.send(user)
      })
    })

    app.get('/api/user', checkJwt, function(req, res) {
      let id = profile.idHashCreate(req.body.sub)

      client.query(`select exists (select 1 from ${env.users} where id=${id});`,[id],
      function(err, result) {
        if (err) console.error(err)
        res.send(result)
      })

    })

      // client.query(`INSERT INTO ${process.env.userTable}(email) VALUES($1)`,
      //   [req.user.nickname],
      //   function(err) {
      //     if (err) console.error(err)
      //     console.log('SUCCES ADDING USER!')
      //   })
 
    }