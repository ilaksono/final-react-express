require('dotenv').config();
const PORT = process.env.PORT || 8001;
const bodyParser = require('body-parser');
const app = require('express')();
// PG database client/connection setup
const db = require('./lib/pool.js');
const dbHelpers = require('./db/dbHelpers.js')(db);
const {
  resolveNaptr
} = require('dns');
app.use(bodyParser.json());

const apiReviews = require('./routes/apiReviews');
app.use('/api/reviews', apiReviews(dbHelpers));
const apiUsers = require('./routes/apiUsers');
app.use('/api/users', apiUsers(dbHelpers));
const apiYelp = require('./routes/apiYelp');
app.use('/api/yelp', apiYelp());
const apiFavs = require('./routes/apiFavs');
app.use('/api/favs', apiFavs(dbHelpers));

app.listen(PORT, () => {
  console.log('listening on ', PORT);
});