
const env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL:
    process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
    users: process.env.userTable
};

module.exports = (app, passport, client) => {
    
    /* GET home page. */
app.get('/', function(req, res, next) {
    res.send('suhhhhh dude');
  });
  
  app.get('/login', passport.authenticate('auth0', {
    clientID: env.AUTH0_CLIENT_ID,
    domain: env.AUTH0_DOMAIN,
    redirectUri: env.AUTH0_CALLBACK_URL,
    responseType: 'code',
    audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
    scope: 'openid profile'})
);
  
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  
  app.get('/callback',
        // console.log('this might be some code response', req)
        passport.authenticate('auth0', {
            failureRedirect: '/failure'
          }),
          (req,res)=>{
            res.redirect('/user');
          }
  );
  
  app.get('/failure', function(req, res) {
    var error = req.flash("error");
    var error_description = req.flash("error_description");
    req.logout();
    res.render('failure', {
      error: error[0],
      error_description: error_description[0],
    });
  });
  

}
