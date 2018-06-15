const Client = require('../../database/client')

const pollValidate = require('./poll-validation')

const env = {
    uid: process.env.uid,
    users: process.env.userTable
};




module.exports = {
    postPollQuery : function(res, user, validatedPoll){
        Client.query(`
        WITH poll AS (INSERT INTO polls (author_id, author_username, subject, question)
        VALUES ($1, $2, $3, $4) RETURNING created_at, id, author_id, subject, question, author_username)
        UPDATE poller_data SET polls_id = array_append(polls_id, poll.id) 
        FROM poll WHERE poller_data.id=poll.author_id
        RETURNING poll.author_username, poll.created_at, poll.subject, poll.question;
        `,
        [user[`${env.uid}`],
        user.nickname,
        validatedPoll.pollSubject,
        validatedPoll.pollQuestion,
        ],
        function(err, success) {
        if (success && success.command==='UPDATE' && success.rowCount== 1) {
            console.log('SUCCESS, these are the rows', success.rows[0])
            res.status(200).json(success.rows[0])
        } else {
            if (err.name =='error' && err.constraint=='poller_data_polls_id_check') {
            console.log('err.name', err)
            res.status(550).send({error: err.name})
            } else {
            console.log('this is ther ror', err)
            res.status(500).send({message: err.name})
            }
        }
        })
    },
    deletePollQuery : (res, user, validatedPoll) => {
        Client.query(`
        WITH poll AS (
        DELETE FROM polls WHERE created_at=($2) AND author_id=($1)
        RETURNING id, author_id, created_at
        )
        UPDATE poller_data SET polls_id = array_remove(polls_id, poll.id) from poll WHERE poller_data.id=poll.author_id
        RETURNING poll.created_at;`,
        [user[`${env.uid}`],
        validatedPoll.created_at,
        ],
        function(err, success) {
        // if (success) {
        //     if (success.rows[0]){
        //     console.log('SUCCESS', success.rows[0])
        //     let pollToDelete = pollValidate.formatPollDeleteSend(success.rows[0])
        //     res.status(200).json(pollToDelete)
        //     }
        //     if (success.rowCount==0){
        //     console.log('success, not returning anything', success)
        //     res.status(401).json({message:'poll was not found'})
        //     } 
        // } 
        // else {
        //     if (err.name =='error') {
        //     console.log('err.name', err)
        //     res.status(500).send({error: err.name})
        //     }
        // }
            res.status(500).send('sup')
        })
    },
    getPollsQuery: (res,user, expirationDate)=>{
        Client.query(`
        SELECT question, subject, author_username, created_at,
        (($2)-EXTRACT(hour from (now() - date))) as expiration
        from polls WHERE author_id=($1)
         `,
        [
          user[`${env.uid}`],
          expirationDate,
        ],
        function(err, success) {
          if (success) {
            console.log('this is success from POLLLLLLLLS DB', success)
            res.status(200).send(success.rows)
          } else {
            if (err) {
              console.log('err.name', err)
              res.status(500).send({error: err})
            }
          }
        })
    }
}