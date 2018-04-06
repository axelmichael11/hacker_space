const env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
      users: process.env.userTable
  };

  module.exports = (app, client, checkJwt) => {
    app.post('/api/signup', checkJwt, function(req, res) {
      console.log('this is the req', req)
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
  });
  }