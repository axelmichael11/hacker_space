/* GET user profile. */
require('dotenv');

const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

module.exports = (app, client) => {
    app.get('/user', ensureLoggedIn, function(req, res, next) {
        console.log('this is back to the user', req.user);
        client.query(`INSERT INTO ${process.env.userTable}(email) VALUES($1)`,
        [req.user.nickname],
        function(err) {
          if (err) console.error(err)
          console.log('SUCCES ADDING USER!')
        })
      });
}