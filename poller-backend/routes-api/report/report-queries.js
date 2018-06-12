const Client = require('../../database/client')

const reportValidation = require('./report-validation')

const env = {
    uid: process.env.uid,
    users: process.env.userTable
};




module.exports = {
    reportPoll : (res, user, reportData)=> {
        Client.query(`
          UPDATE polls 
          SET report = array_append(report, ($1)) 
          WHERE polls.author_username=($3)
          AND polls.created_at=($1);      
              `,
              [
                reportData.nickname,
                reportData.created_at,
                reportData.author_username,
              ],
              function(err, success) {
                if (success) {
                  console.log('this is success from db', success)
                  if (success.rows[0]) {
                    res.status(200).send('data has been reported')
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
}