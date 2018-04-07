require('dotenv').config({ path: `${__dirname}/../.test.env` })
require('babel-register')
const expect = require('expect')
const superagent = require('superagent')

const server = require('../server/apiserver.js')
let API_URL = process.env.API_URL

let API_TOKEN = process.env.API_TOKEN;

describe('testing listing router', () => {
  before(server.start)
  after(server.stop)
  // afterEach(cleanDB);

  it('this is api get request to put a profile in the database..', () => {
      console.log('this is the token', process.env.API_TOKEN)
      console.log('this is the apiurl', process.env.API_URL)
    return superagent.post(`${API_URL}/api/usercreate`)
    .set('Authorization',`Bearer ${API_TOKEN}`)
    // .send({
    //     userName: 'maxelson11',
    //     age: 25,
    //     ethnicity: 'white',
    //     profession: 'IT',
    //     state: 'WA',
    //     religious: true,
    //     gender: true,
    //     sub:'woeiowefsdnsdfsdflkj'
    // })
    .then(res => {
        console.log('this is the response!!', res)
        //   let parsed = JSON.parse(res.text)
        //   dispatch(profileFetch(parsed.user_metadata.profile))
        console.log('res.body',res.body)
        expect(res.body).toExist();
      })
      .catch(err => console.log('something wrong with this authorization im assuiming',err))

  })


})

