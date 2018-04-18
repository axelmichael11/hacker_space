



const queries = {};

queries.createUser = ``;

queries.getUser = (id) => `SELECT * FROM ${process.env.userTable} WHERE id=${id};`;

module.exports = queries;
