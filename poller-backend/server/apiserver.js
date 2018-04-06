const express = require('express');
const app = express();
const pg = require('pg');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

//app is using...
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

const checkScopes = jwtAuthz(['read:messages']);

//initiate Postgres DB
const client = new pg.Client({
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DB,
    port: process.env.DBPORT,
    host: process.env.DBHOST,
    ssl: true
  });



app.get('/', function(req, res) {
  res.json({
    message: 'Hello THE SIMPLE / route You don\'t need to be authenticated to see this.'
  });
});
app.get('/api/public', function(req, res) {
    console.log('this is the req', req)
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

app.get('/api/private', checkJwt, function(req, res) {
    console.log('this is the req', req)
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});


//ROUTES
require('../routes-api/profile-routes.js')(app, client, checkJwt);

app.use(function(err, req, res, next){
  console.error(err.stack);
  return res.status(err.status).json({ message: err.message });
});

app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Handle auth failure error messages
app.use(function(req, res, next) {
    if (req && req.query && req.query.error) {
      req.flash("error", req.query.error);
    }
    if (req && req.query && req.query.error_description) {
      req.flash("error_description", req.query.error_description);
    }
    next();
   });


const state = {
    isOn: false, 
    http: null,
  }
  
  const server = {};
  
  server.start = () => {
    // const client = new pg.Client(process.env.DATABASE_URI);
    return new Promise((resolve, reject) => {
      // console.log('this is hte client!', client);
      if (state.isOn) 
          return reject(new Error('USAGE ERROR: the state is on'))
      state.isOn = true
      // console.log('this is the client database', client)
      return client.connect()
      .then(() => {
        state.http = app.listen(process.env.PORT, () => {
          console.log('__SERVER_UP__', process.env.PORT)
          resolve()
        })
      })
      .catch((error)=>{
        console.log('this is the erroer!',error)
      })
    })
  }
  
  
  
  module.exports = server;