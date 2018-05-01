const bcrypt = require('bcrypt');
const superagent = require('superagent');

const poll = {};

poll.userPollValidate = function(incomingPoll){
    let {nickname, pollQuestion, pollSubject} = incomingPoll;
    let poll = Object.assign({},{nickname, pollQuestion, pollSubject});
    if (!poll.nickname || poll.nickname.length > 20 || typeof poll.pollSubject !== 'string'){
        throw new Error('invalid nickname type or length, or nonexistant property');
    }
    if (!poll.pollSubject || poll.pollSubject.length < 5 || typeof poll.pollSubject !== 'string'){
        throw new Error('invalid subject type or length, or nonexistant property');
    }
    if (!poll.pollQuestion || poll.pollQuestion.length < 10 || typeof poll.pollQuestion !== 'string'){
        throw new Error('invalid question type or length, or nonexistant property');
    }
    console.log('successfully validated pool,', poll)
    return poll
}


poll.deletePollValidate = function(incomingPoll){
  let {timeStamp} = incomingPoll;
  
  let poll = Object.assign({},{timeStamp});
  if (!poll.timeStamp || typeof poll.pollQuestion !== 'string'){
    throw new Error('invalid question type or length, or nonexistant property');
  }
  return poll;
}


poll.formatSendpoll = function(rows,authpoll){
  console.log('ROWS', rows)
  let {gender, age, ethnicity, profession, country, religion} = rows;
  let {nickname, picture, email} = authpoll;
  let returnedpoll = Object.assign({},{gender, age, profession, country, ethnicity, religion, nickname, email, picture});
  return returnedpoll
}

poll.getInfo = function(token){
  return superagent.get(`https://${process.env.AUTH0_DOMAIN}/userinfo`)
        .set('Authorization',`${token}`)
        .set('scope','openid poll email read write user_metadata userId')
        .then((response)=>{
          return response.body
        })
        .catch(err=> console.log('error',err))
}


poll.sendId = function(sub, token, rows){
    return superagent.patch(`${process.env.AUTH0_AUDIENCE}users/${sub}`)
    .set('Authorization', `${token}`)
    .set('accept', 'application/json')
    .set('content-type', 'application/json')
    .set('scope', 'openid email poll userId read:clients write:clients update:users_app_metadata update:users update:current_user_metadata')
    .send(JSON.stringify({ user_metadata: rows }))
    .then(res => {
        try {
          let parsed2 = JSON.parse(res.text)
        //   expect(parsed2).toBeTruthy();
        //   console.log('this is the response from the api, stored uid', parsed2,'THIS IS THE WHOLE RESPONSE',res);
          return parsed2
        } catch (err) {
          console.log('THIS IS THE ERRORR FROM AUTH0 API METADATA!!!',err)
        }
      })
      .catch(err => {
        console.log('THIS IS THE ERRORR FROM AUTH0 API METADATA!!!',err)
      })
    }


module.exports = poll;

