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
const { resolveNaptr } = require('dns');
const bcrpyt = require("bcrypt");
const salt = bcrpyt.genSaltSync(10);
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'session',
  keys: ['secret', 'key']
}));

const apiKey = process.env.YELP_API_KEY;
const client = yelp.client(apiKey);


app.post("/api/search_yelp", (req, res) => {
  client
  .search({
    term: req.body.venue,
    location: req.body.location,
    limit: 11
  }).then(response => {
    console.log("Ratelimit Remaining: ", response.headers['ratelimit-remaining']);
    let bus = response.jsonBody.businesses;
    bus = bus.map((biz) => {
      biz.categories = cleanAutoComplete(biz.categories,'title');
      return biz
    })
    res.json(bus);
  }).catch(e => {
    console.log(e);
  });
});
app.post("/api/search_one", (req, res) => {
  client
  .search({
    term: req.body.venue,
    location: req.body.location,
    limit: 1
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

app.post("/api/search_yelp/:id", (req, res) => {
  client 
  .business(req.params.id).then(response => {
    res.json(response.jsonBody);
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

app.post("/register", (req, res) => {
  const password = bcrpyt.hashSync(req.body.password, salt)
  console.log(req.body.email)
  dbHelpers.serverRegistrationValidation()
  .then((userData) => {
    userData.some(user => {
      if (user.username === req.body.username) {
         return res.send("username exists")
      } else if (user.email === req.body.email) {
          return res.send("email exists")
      } 
    })
    return res.send("success")
  })
  .then (() => {
    dbHelpers.registration(req.body.username, req.body.email, password)
    .then(response => {
      console.log(response)
    })
    .catch(err => { console.log(err) })
  })
  .catch(error => {console.log(error)})

});

app.post("/login", (req, res) => {
  dbHelpers.serverLoginValidation()
  .then((userData) => {
    userData.some(user => {
      if (user.email === req.body.email) {
        if (bcrpyt.compareSync(req.body.password, user.password)) {
         return res.json({
           email: user.email,
           username: user.username
         })
        } else {
          return res.send("password incorrect")
        }
      }
    })
    return res.send("email does not exist");
  })
  .catch(err => {console.log(err)})
})



app.get("/api/reviews", (req, res) => {
  dbHelpers.getAllReviews()
    .then(reviews => {
      res.send(reviews);
    })
    .catch(error => { console.log(error); });
});

app.post("/api/reviews/:id", (req, res) => {
  dbHelpers.getReviewsPerBusiness(req.params.id)
  .then(reviews => {
    res.send(reviews);
  })
  .catch(error => { console.log(error); });
})

app.listen(PORT, () => {
  console.log('listening on ', PORT);
});

app.post("/reviews/new", (req, res) => {
  dbHelpers.submitReview(
    req.body.user_id,
    req.body.venue_id,
    req.body.cleanliness,
    req.body.socialDistancing,
    req.body.transactionProcess,
    req.body.description,
    req.body.overall_rating)
  .then(review => {
      res.send(review);
  })
  .catch(error => console.log(error));
})

app.post("/reviews/helpful", (req, res) => {
  dbHelpers.updateHelpfulCount(req.body.id)
    .then(response => {
      res.send(response)
    })
    .catch(err => {console.log(err)})
  })
