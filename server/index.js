const PORT = process.env.PORT || 8001;
const bodyParser = require('body-parser');
const app = require('express')();
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();
const dbHelpers = require('./db/dbHelpers.js')(db);


app.use(bodyParser.json());

app.use(cookieSession({
  name: 'session',
  keys: ['secret', 'key']
}));

app.get('/api/center', (req, res) => {
  res.json({msg:'hi'});
});
app.get('/api/', (req, res) => {
  res.json('hello');
  dbHelpers.fetchLatlngByIP()
  .then((res) => req.session.latLng = res)
  .catch(er=> console.log(er));
})

app.listen(PORT, () => {
  console.log('listening on ', PORT);
});