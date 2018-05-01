require('dotenv').config({ path: `${__dirname}/.test.env` })
require('babel-register')
const expect = require('expect')
const superagent = require('superagent')

const server = require('../server/apiserver.js')
const API_URL = process.env.API_URL;

const API_TOKEN = process.env.API_TOKEN;

const AUTH0_ID = process.env.AUTH0_ID;

const __AUTH0_AUDIENCE__ = process.env.AUTH0_AUDIENCE

const DB_UID = process.env.DB_UID;

describe('testing profile queries...', () => {
  before(server.start)
  after(server.stop)


  it.only('this is the profile create method, should return a user', () => {
    return superagent.get(`${API_URL}/api/user`)
        .set('Authorization',`Bearer ${API_TOKEN}`)
        .set('accept', 'application/json')
        .set('content-type', 'application/json')
        .then(res => {
            let parsed = JSON.parse(res.text)
            expect(res.text).toBeTruthy();
            console.log('parsed.data',parsed)
            return parsed;
          })
          .catch(err => console.log(err))
  })

  it('testing updating profile information in the database...', () => {

    let profile = {age:25, profession:'IT', country:'USA', ethnicity:'causasian',gender:true, uid: DB_UID}
    console.log('this is the PROFILE', profile);
    return superagent.put(`${API_URL}/api/userupdate`)
    .set('Authorization',`Bearer ${API_TOKEN}`)
    .set('accept', 'application/json')
    .set('content-type', 'application/json')
    .send(profile)
    .then(res => {
        console.log('res.text', res.text)
          let parsed = JSON.parse(res.text)
        expect(res.text).toBeTruthy();
        console.log('parsed.data',parsed)
        return parsed.data;
      })
      .catch(err => next(err))
  })

  it('testing deleting profile information in the database...', () => {

    let profile = {uid: DB_UID}
    console.log('this is the PROFILE', profile);
    return superagent.delete(`${API_URL}/api/user`)
    .set('Authorization',`Bearer ${API_TOKEN}`)
    .set('accept', 'application/json')
    .set('content-type', 'application/json')
    .send(profile)
    .then(res => {
        console.log('res.text', res.text)
          let parsed = JSON.parse(res.text)
        expect(res.text).toBeTruthy();
        console.log('parsed.data',parsed.data)
        return parsed.data;
      })
      .catch(err => next(err))
  })



})

