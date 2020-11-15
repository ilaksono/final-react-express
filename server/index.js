const PORT = process.env.PORT || 8001;

const app = require('express').server();
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'vagrant',
    password: 'final',
    database: 'final'
  }
});
 
// app.use('/api/users')

app.get('/api/center', (req, res) => {
  
})