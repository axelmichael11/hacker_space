const auth = {};


auth.addUser = function(userName){
    client.query(`INSERT INTO ${env.users}(email) VALUES (${userName});`)
}