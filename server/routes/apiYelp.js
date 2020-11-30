const router = require('express').Router();

const yelp = require('yelp-fusion');

const apiKey = process.env.YELP_API_KEY;
const client = yelp.client(apiKey);

const cleanAutoComplete = (data, keyword) => {
  const result = data.map(item => item[keyword]);
  return result;
};

module.exports = () => {
  router.post("/search", (req, res) => {
    client
      .search({
        term: req.body.venue,
        location: req.body.location,
        limit: 50
      }).then(response => {
        console.log("Ratelimit Remaining: ", response.headers['ratelimit-remaining']);
        let bus = response.jsonBody.businesses;
        bus = bus.map((biz) => {
          biz.categories = cleanAutoComplete(biz.categories, 'title');
          return biz;
        });
        res.json(bus);
      }).catch(e => {
        console.log(e);
      });
  });

  router.post("/search/:id", (req, res) => {
    client
      .business(req.params.id).then(response => {
        res.json(response.jsonBody);
      }).catch(e => {
        console.log(e);
      });
  });


  router.post("/autocomplete", (req, res) => {
    client
      .autocomplete({
        text: req.body.venue,
        latitude: req.body.latitude,
        longitude: req.body.longitude
      }).then(response => {
        console.log("Ratelimit Remaining: ", response.headers['ratelimit-remaining']);
        const businesses = cleanAutoComplete(response.jsonBody.businesses, "name").slice(0, 4);
        const categories = cleanAutoComplete(response.jsonBody.categories, "title").slice(0, 5);
        const obj = {
          businesses,
          categories
        };
        res.json(obj);

      }).catch(e => {
        console.log(e);
      });
  });

  router.post("/one", (req, res) => {
    client
      .search({
        term: req.body.venue,
        location: req.body.location,
        limit: 1
      }).then(response => {
        console.log("Ratelimit Remaining: ", response.headers['ratelimit-remaining']);
        res.json(response.jsonBody.businesses[0].image_url);
      }).catch(e => {
        console.log(e);
      });
  });



  return router;
};