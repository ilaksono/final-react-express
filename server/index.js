require('dotenv').config();

const PORT = process.env.PORT || 8001;
const bodyParser = require('body-parser');
const app = require('express')();
const cookieSession = require("cookie-session");
const https = require('https');
const request = require('request-promise-native');
// PG database client/connection setup
const db = require('./lib/pool.js');
const dbHelpers = require('./db/dbHelpers.js')(db);
const yelp = require('yelp-fusion');
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
const apiKey = process.env.YELP_API_KEY;
const client = yelp.client(apiKey);
// app.post("/api/search_yelp", (req, res) => {
//   https.get({
//     hostname: 'api.yelp.com',
//     path: `/v3/businesses/search?term=${req.body.venue}&location=${req.body.location}&limit=5`,
//     headers: {
//       Authorization: `Bearer ${apiKey}`
//     }
//   }, response => {
//     response.pipe(res)
//   })
// });
app.post("/api/search_yelp", (req, res) => {
  client
    .search({
      term: req.body.venue,
      location: req.body.location,
      limit: 5
    }).then(response => {
      console.log("Ratelimit Remaining: ", response.headers['ratelimit-remaining']);
      res.json(response.jsonBody.businesses);
    }).catch(e => {
      console.log(e);
    });
});

app.post("/api/autocomplete_yelp", (req, res) => {
  client
    .autocomplete({
      text: req.body.venue,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }).then(response => {
      console.log("Ratelimit Remaining: ", response.headers['ratelimit-remaining']);
      const businesses = cleanAutoComplete(response.jsonBody.businesses, "name").slice(0, 4);
      const categories = cleanAutoComplete(response.jsonBody.categories, "title").slice(0, 5);
      const obj = { businesses, categories };
      res.json(obj);
      
    }).catch(e => {
      console.log(e);
    })
})

const cleanAutoComplete = (data, keyword) => {
  const result = data.map(item => item[keyword]);
  return result;
}


// get business details
app.get("/api/search_yelp/:id", (req, res) => {
  // https.get({
  //   hostname: 'api.yelp.com',
  //   path: `/v3/businesses/${req.query.term}`,
  //   headers: {
  //     Authorization: `Bearer ${apiKey}`
  //   }
  // }, response => {
  //   response.pipe(res)
  // })
});

app.get("/api/reviews", (req, res) => {
  dbHelpers.getAllReviews()
    .then(reviews => {
      res.send(reviews);
    })
    .catch(error => { console.log(error); });
});

app.listen(PORT, () => {
  console.log('listening on ', PORT);
});
