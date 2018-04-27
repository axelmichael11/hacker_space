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

describe('testing poll validation...', () => {
  before(server.start)
  after(server.stop)
  it('this is the poll create method, should return errors for missing right properties', () => {

    let poll = {nickname:'helloo'}
    console.log('this is the APIR TOKEN', API_TOKEN)
    return superagent.post(`${API_URL}/api/poll`)
        .set('Authorization',`Bearer ${API_TOKEN}`)
        .set('accept', 'application/json')
        .set('content-type', 'application/json')
        .send(poll)
        .then(res => {
          try {
            let parsed = JSON.parse(res.text)
          console.log('here is the parsed',parsed);
          expect(res.status).toEqual(500)
          expect(parsed).toEqual('Error: invalid nickname type or length, or nonexistant property')
          return parsed
          } catch (err) {
            console.log('THIS IS THE ERROR from posting a poll',err)
          }
        })
        .catch(err => console.log(err))
  })

  it('this should have errors for having incorrect subject lenght', ()=>{
    let poll = {nickname:'helloo', pollSubject:'11', pollQuestion:'alsdfsdfsdlfsdfalskdjfasd'}
    console.log('this is the APIR TOKEN', API_TOKEN)
    return superagent.post(`${API_URL}/api/poll`)
        .set('Authorization',`Bearer ${API_TOKEN}`)
        .set('accept', 'application/json')
        .set('content-type', 'application/json')
        .send(poll)
        .then(res => {
          try {
            let parsed = JSON.parse(res.text)
          console.log('here is the parsed',parsed);
          expect(res.status).toEqual(500)
          expect(parsed).toEqual('Error: invalid subject type or length, or nonexistant property')
          return parsed
          } catch (err) {
            console.log('THIS IS THE ERROR from posting a poll',err)
          }
        })
        .catch(err => console.log(err))
  })

  it.only('this should have errors for having incorrect question data type', ()=>{
    let poll = {nickname:'helloo', pollSubject:'11', pollQuestion:{sup:'helloooo'}}
    console.log('this is the APIR TOKEN', API_TOKEN)
    return superagent.post(`${API_URL}/api/poll`)
        .set('Authorization',`Bearer ${API_TOKEN}`)
        .set('accept', 'application/json')
        .set('content-type', 'application/json')
        .send(poll)
        .then(res => {
          try {
            let parsed = JSON.parse(res.text)
        //   console.log('here is the parsed',parsed);
          expect(res.status).toEqual(500)
          expect(parsed).toEqual('Error: invalid question type or length, or nonexistant property')
          return parsed
          } catch (err) {
            console.log('THIS IS THE ERROR from posting a poll',err)
          }
        })
        .catch(err => console.log(err))
  })


})

