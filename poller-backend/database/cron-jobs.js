const cron = require('node-cron');

const Client = require('./client')


module.exports = {
    updatePolls: cron.schedule('* * 0-23 * * 0-7', function(){
            Client.query(`
                delete from polls where date < (now() - INTERVAL 3 DAY);
                `,
                function(err, success) {
                    if (err) {
                        console.log('error from database', err)
                    }
                    if (success) {
                        console.log('this is the db success', success)
                    }
                }
            )
        }),
    deleteReportedPolls: cron.schedule('* * 0-23 * * 0-7', function(){
        Client.query(`
            delete from polls where cardinality(report) = 10;
            `,
            function(err, success) {
                if (err) {
                    console.log('error from database', err)
                }
                if (success) {
                    console.log('this is the db DELETE REPORTED POLLS', success)
                }
            }
        )
    }),
        
    
}