



const queries = {};

queries.createUser = (client) => {
  let result;
    client.query(`INSERT INTO ${process.env.users} DEFAULT VALUES RETURNING id;`,
      function(err, success) {
        if (err) res.json({response: err})
        if (success) {
          let rows = success.rows[0]
          console.log('successfully put in database... HERE IS THE SUCCESS', success);
          result = rows
        } else {
          result = new Error('unable to create new user');
        }
      });
      return result;
}

module.exports = queries;
