const Client = require('../../database/client')

const pollValidate = require('./vote-validation')

const env = {
    uid: process.env.uid,
    users: process.env.userTable
};




module.exports = {
    getVotes : (res, user, voteData)=> {
        console.log('this is the user',user[`${env.uid}`])

        Client.query(`
                SELECT *
                FROM polls
                WHERE author_username=($2) 
                AND created_at=($1) 
                AND ($3) = ANY(votes);
              `,
              [
                voteData.created_at,
                voteData.author_username,
                user[`${env.uid}`],
              ],
              function(err, success) {
                if (success) {
                  console.log('this is success from db', success, success.rows, success.rowCount)
                  if (success.rows[0]) {
                    res.status(200).send(success.rows[0])
                  }
                  if (success.rows ==[]){
                    res.status(401).send()
                  }
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
                voteData.gender,
                voteData.ethnicity,
                voteData.profession,
                voteData.religion,
                user[`${env.uid}`],
                voteData.author_username,
                voteData.created_at,
              ],
              function(err, success) {
                if (success) {
                  console.log('this is success from db', success, success.rows, success.rowCount)
                  if (success.rows[0]) {
                      console.log('array yes data,')
                    res.status(200).send(success.rows[0])
                  }
                  console.log('hitting the 401 here...')
                  res.status(401).send()
                } else {
                  if (err) {
                    console.log('err.name', err)
                    res.status(500).send({error: err})
                  }
                }
              })
        }
}