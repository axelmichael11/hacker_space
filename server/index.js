//imports
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
// connpmst process = require('process');
const app = express();

require('dotenv').config();

const cors = require('cors');
const morgan = require('morgan');
const pg = require('pg');

//app is using...
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//variables
const connectionString = process.env.DATABASE_URI;
const client = new pg.Client({
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DB,
  port: process.env.DBPORT,
  host: process.env.DBHOST,
  ssl: true
})


// require('./server/routes')(app);
// app.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome to the beginning of nothingness.',
// }));

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
