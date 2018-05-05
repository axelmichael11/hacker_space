require('dotenv').config({ path: `${__dirname}/.test.env` })
require('babel-register')

const expect = require('expect')
const superagent = require('superagent')

const server = require('../server/apiserver.js')
const API_URL = process.env.API_URL;

const API_TOKEN = process.env.API_TOKEN;

const AUTH0_ID = process.env.AUTH0_ID;

const __AUTH0_AUDIENCE__ = process.env.AUTH0_AUDIENCE

describe('testing poll create route...', () => {
  before(server.start)
  after(server.stop)
  it.only('this is fetch poll method, should return vote results or no results if user has not voted', () => {
    let voteData = {question: "asdfasdfasdf", subject: "asdfasdf", author_username: "maxelson11", created_at: "05:04:07:52:30"}
    return superagent.get(`${API_URL}/api/votes`)
    .set('Authorization', `Bearer ${API_TOKEN}`)
    .send(voteData)
    .then(res => {
        let parsed = JSON.parse(res.text)
        console.log(parsed)
        dispatch(fetchPublicPolls(parsed))
    })
    .catch(err => {
        if (err.status == 550){
        throw new Error(550)
        } 
    })
  })
})