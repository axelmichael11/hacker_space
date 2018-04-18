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
  it('this is the profile create method, should return a user', () => {
    return superagent.get(`/api/user/${DB_UID}`)
        .set('Authorization',`Bearer ${API_TOKEN}`)
        .set('accept', 'application/json')
        .set('content-type', 'application/json')
        .then(res => {
            console.log('res.text', res.text)
              let parsed = JSON.parse(res.text)
            expect(res.text).toBeTruthy();
            console.log('parsed.data',parsed.data)
            return parsed.data;
          })
          .catch(err => next(err))
  })
  it('this is the profile create method, should return a user', () => {
      console.log('API_TOKEN', API_TOKEN)
    return superagent.post(`${API_URL}/api/user`)
    .set('Authorization',`Bearer ${API_TOKEN}`)
    .set('accept', 'application/json')
    .set('content-type', 'application/json')
    .then(res => {
        console.log('res.text', res.text)
          let parsed = JSON.parse(res.text)
        expect(res.text).toBeTruthy();
        console.log('parsed.data',parsed.data)
        return parsed.data;
      })
      .catch(err => next(err))
      .then(data =>{
        console.log('HITING THE ROUTE TO AUTH0 API, THIS IS THE ID', data)
        expect(data.id).toBeTruthy();

        console.log('#############THIS IS THE AUTH0 AUDIENCE', __AUTH0_AUDIENCE__, AUTH0_ID)

        return superagent.patch(`${__AUTH0_AUDIENCE__}users/${AUTH0_ID}`)
        .set('Authorization', `Bearer ${API_TOKEN}`)
        // .set('user_id', `${AUTH0_ID}`)
        .set('accept', 'application/json')
        .set('content-type', 'application/json')
        // update:users,update:users_app_metadata,update:current_user_metadata
        .set('scope', 'read:users create:users update:users read:users_app_metada update:users_app_metada create:users_app_metada delete:users_app_metada')
        .send(JSON.stringify({ user_metadata: { uid: data.id } }))
        .then(res => {
          try {
            let parsed2 = JSON.parse(res.text)
            expect(parsed2).toBeTruthy();
            console.log('this is the response from the api, stored uid', parsed2,'THIS IS THE WHOLE RESPONSE',res);
          } catch (err) {
            console.log('THIS IS THE ERRORR FROM AUTH0 API METADATA!!!',err)
          }
        })
        .catch(err => {
          console.log('THIS IS THE ERRORR FROM AUTH0 API METADATA!!!',err)
        })
      })
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
        console.log('parsed.data',parsed.data)
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

