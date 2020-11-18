const PORT = process.env.PORT || 8001;
const bodyParser = require('body-parser');
const app = require('express')();
const cookieSession = require("cookie-session");

// PG database client/connection setup
<<<<<<< HEAD
=======
const db = require('./lib/pool.js');
const dbHelpers = require('./db/dbHelpers.js')(db);
>>>>>>> 61c38e00692b106168ee6ff0da5441230c899cdd

const db = require('./lib/pool.js');

const dbHelpers = require('./db/dbHelpers.js')(db);

app.use(bodyParser.json());
app.use(cookieSession({
  name: 'session',
  keys: ['secret', 'key']
}));

/* app.get('/api/center', (req, res) => {
  res.json({msg:'hi'});
}); */
/* app.get('/api/center', (req, res) => {
  dbHelpers.fetchLatlngByIP()
  .then((res) => { 
    res.json(latLng)
    console.log("RES", res);
  })
  .catch(er=> console.log(er));
}) */

app.listen(PORT, () => {
  console.log('listening on ', PORT);
});