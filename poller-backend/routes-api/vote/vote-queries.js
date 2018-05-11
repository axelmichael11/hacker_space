const Client = require('../../database/client')

const vollValidate = require('./vote-validation')

const env = {
    uid: process.env.uid,
    users: process.env.userTable
};




module.exports = {
    getVotes : (res, user, voteData)=> {
        console.log('this is the user',user[`${env.uid}`])

        Client.query(`
                SELECT count(votes), array_yes_data, array_no_data
                FROM polls
                WHERE author_username=($2) 
                AND created_at=($1) 
                AND ($3) = ANY(votes)
                GROUP BY array_yes_data, array_no_data;
              `,
              [
                voteData.created_at,
                voteData.author_username,
                user[`${env.uid}`],
              ],
              function(err, success) {
                if (success) {
                //   console.log('this is success from db', success, success.rows, success.rowCount)
                  if (success.rows[0]) {
                      console.log('this is the success ROWS DATA', success.rows[0],'this is the array yes data',success.rows[0].array_yes_data);
                      let data = {}
                      data.yes_data = vollValidate.formatVoteData(success.rows[0].array_yes_data)
                    res.status(200).send(data)
                  }
                    res.status(401).send()
                } else {
                  if (err) {
                    console.log('err.name', err)
                    res.status(500).send({error: err})
                  }
                }
              })
        },
        castVote : (res, user, voteData) => {
            let data = JSON.stringify(voteData)
            console.log
            if (voteData.vote==='yes'){
                castYesVote(res,user,voteData)
            }
            if (voteData.vote==='no'){
                castNoVote(res,user,voteData)
            }
            if (!voteData.vote==='yes'||!voteData.vote==='no'){
                res.status(401).send('you dont seem to have a yes or no vote...')
            }
        }
}

castNoVote = (res,user,voteData)=>{
    Client.query(`
    UPDATE polls 
    SET array_no_data = array_no_data || ARRAY[[($1),($2),($3),($4),($5),($6)]],
    votes = array_append(votes, ($7))
    WHERE polls.author_username=($8)
    AND polls.created_at=($9) 
    RETURNING polls.array_yes_data, polls.array_no_data, cardinality(votes) as totolVotes, cardinality(array_yes_data) as votedYes, cardinality(array_no_data) as votedNo;
  `,
  [
    voteData.age,
    voteData.country,
    voteData.ethnicity,
    voteData.profession,
    voteData.gender,
    voteData.religion,
    user[`${env.uid}`],
    voteData.author_username,
    voteData.created_at,
  ],
  function(err, success) {
    if (success) {
      console.log('this is success from db', (success.rows.length> 0), success.rowCount)
      if (success.rows.length >0) {
          console.log('array no RESPONSE,')
          let data = {}
          data.yes_data = vollValidate.formatVoteData(success.rows[0].array_yes_data)
          data.no_data = vollValidate.formatVoteData(success.rows[0].array_no_data)
        res.status(200).send(data)
      }
      if (success.rows.length = 0){
        res.status(401).send(success.rows[0])
      }
    } else {
      if (err) {
        console.log('err.name', err)
        res.status(500).send({error: err})
      }
    }
  })

}

castYesVote = (res,user,voteData)=>{
    Client.query(`
                UPDATE polls 
                SET array_yes_data = array_yes_data || ARRAY[[($1),($2),($3),($4),($5),($6)]],
                votes = array_append(votes, ($7))
                WHERE polls.author_username=($8)
                AND polls.created_at=($9) 
                RETURNING polls.array_yes_data, polls.array_no_data, cardinality(votes) as totolVotes, cardinality(array_yes_data) as votedYes, cardinality(array_no_data) as votedNo;
              `,
              [
                voteData.age,
                voteData.country,
                voteData.ethnicity,
                voteData.profession,
                voteData.gender,
                voteData.religion,
                user[`${env.uid}`],
                voteData.author_username,
                voteData.created_at,
              ],
              function(err, success) {
                if (success) {
                  console.log('this is success from db', (success.rows.length> 0), success.rowCount)
                  if (success.rows.length >0) {
                      console.log('array yes data,')
                      let data = {}
                      data.yes_data = vollValidate.formatVoteData(success.rows[0].array_yes_data)
                    res.status(200).send(data)
                  }
                  if (success.rows.length = 0){
                    res.status(204).send('no content found')
                  }
                } else {
                  if (err) {
                    console.log('err.name', err)
                    res.status(500).send({error: err})
                  }
                }
              })
}
