export const pollSend = (poll) => (dispatch, getState) => {
    let { auth0Token } = getState();
    return superagent
        .post(`${__API_URL__}/api/poll`)
        .set('Authorization', `Bearer ${auth0Token}`)
        .send(poll)
        .then(res => {
          try {
            let parsed = JSON.parse(res.text)
          console.log('successfully put poll in the database',parsed)
          return parsed
          } catch (err) {
            console.log('THIS IS THE ERROR from posting a poll',err)
          }
        })
        .catch(err => console.log(err))
  }