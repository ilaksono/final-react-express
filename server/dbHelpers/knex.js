const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'vagrant',
    password: 'final',
    database: 'final'
  }
});
const connection = knex(process.env); 

module.exports = connection;