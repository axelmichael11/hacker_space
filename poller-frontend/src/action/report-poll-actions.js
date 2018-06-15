
const superagent = require('superagent');



export const reportPoll = (poll) => (dispatch, getState) => {
    let { auth0Token, userProfile } = getState();
    let {nickname} = userProfile;
    let {created_at, author_username} = poll;
    let data = Object.assign({}, {nickname, created_at, author_username});
    return superagent
        .post(`${__API_URL__}/api/report`)
        .set('Authorization', `Bearer ${auth0Token}`)
        .send(data)
        .then(res => {
          let parsed = JSON.parse(res.text)

          return parsed
        })
  }