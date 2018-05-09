const Client = require('../../database/client')

const profileValidate = require('./profile-validation')
const env = {
    uid: process.env.uid
};

module.exports = {
        fetchProfileQuery : (res, user) => {
        Client.query(`
        with existing as (
        select *
        from poller_data
        where id = ($1)
        ), insert as (
        insert into poller_data (id)
        select ($1)
        where not exists (select 1 from existing)
        returning *)
        select *
        from insert
        union all
        select *
        from existing;`,
        [
        user[`${env.uid}`]
        ],
        function(err, success) {
        if (err) {
            console.log('error from database', err)
            res.json({response: err})
        }
        if (success) {
            console.log('this is the db success', success)
            let sendProfile = profileValidate.formatSendProfile(success.rows[0], user)
            console.log('this is the final profile to send back', sendProfile)
            res.json(sendProfile)
        }
        })
    }
}