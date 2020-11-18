const PORT = process.env.PORT || 8001;
const bodyParser = require('body-parser');
const app = require('express')();
const cookieSession = require("cookie-session");
const https = require('https')

// PG database client/connection setup
const db = require('./lib/db.js');
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

app.get("/api/search_yelp", (req, res) => {
  const apiKey = '-YMJsVqjVv1kq_rVfU1XhxosOPD06hwpRU5pG2OHqzgkIGWGQc-UaX_66qxdPEgOAvhtNIRO9OzMscCr2yhNAx34S20VZGXu2Tia91y6TVldQycQLamv18aGKky1X3Yx';
  https.get({
    hostname: 'api.yelp.com',
    path: `/v3/businesses/search?term=${req.query.term}&location=montreal,qc&limit=5`,
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  }, response => {
    response.pipe(res)
  })
})

app.listen(PORT, () => {
  console.log('listening on ', PORT);
});