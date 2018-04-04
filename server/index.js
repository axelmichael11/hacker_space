//imports
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const process = require('process');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const pg = require('pg');

//app is using...
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//variables
const connectionString = process.env.DATABASE_URL;



require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

const state = {
  isOn: false, 
  http: null,
}

const server = {};

server.start = () => {
  if (state.isOn) 
      return reject(new Error('USAGE ERROR: the state is on'))
    state.isOn = true
    const client = new pg.Client(process.env.DATABASE_URL);
    return client.connect()
    .then(() => {
      state.http = app.listen(process.env.PORT, () => {
        console.log('__SERVER_UP__', process.env.PORT)
        resolve()
      })
    })
    .catch(reject)
  })
}

export const stop = () => {
  return new Promise((resolve, reject) => {
    if(!state.isOn)
      return reject(new Error('USAGE ERROR: the state is off'))
    const client = new pg.Client(connectionString);
    return client.connect()
    .then(()=>{

    })
    return mongo.stop()
    .then(() => {
      state.http.close(() => {
        console.log('__SERVER_DOWN__')
        state.isOn = false
        state.http = null
        resolve()
      })
    })
    .catch(reject)
  })
}



module.exports = server;
