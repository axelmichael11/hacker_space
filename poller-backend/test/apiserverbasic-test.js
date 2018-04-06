require('dotenv').config({ path: `${__dirname}/../.test.env` })
require('babel-register')
const expect = require('expect')
const superagent = require('superagent')

const server = require('../server/apiserver.js')

const mockListing = require('./lib/mock-listing.js')

let API_URL = process.env.API_URL

describe('testing listing router', () => {
  before(server.start)
  after(server.stop)
  // afterEach(cleanDB);

  it('this is api get request to ')


})

