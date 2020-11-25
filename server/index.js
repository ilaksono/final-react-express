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
const {
  resolveNaptr
} = require('dns');
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
        biz.categories = cleanAutoComplete(biz.categories, 'title');
        return biz;
      });
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
      res.json(response.jsonBody.businesses[0].image_url);
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
      const obj = {
        businesses,
        categories
      };
      res.json(obj);

    }).catch(e => {
      console.log(e);
    });
});


const cleanAutoComplete = (data, keyword) => {
  const result = data.map(item => item[keyword]);
  return result;
};

app.post("/register", (req, res) => {
  const password = bcrpyt.hashSync(req.body.password, salt);
  let exists = false;
  dbHelpers.serverRegistrationValidation()
    .then((userData) => {
      userData.some(user => {
        if (user.username === req.body.username) {
          exists = true;
          return res.send("username exists");
        } else if (user.email === req.body.email) {
          exists = true;
          return res.send("email exists");
        }
      });
    })
    .then(() => {
      if (exists === false) {
        dbHelpers.registration(req.body.username, req.body.email, password, req.body.city)
          .then(response => {
            console.log(response);
            res.json({
              username: response[0].username,
              profile_pic: response[0].profile_pic,
              user_id: response[0].id

            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(error => {
      console.log(error);
    });

});

app.post("/login", (req, res) => {
  dbHelpers.serverLoginValidation()
    .then((userData) => {
      userData.some(user => {
        if (user.email === req.body.email) {
          if (bcrpyt.compareSync(req.body.password, user.password)) {
            return res.json({
              username: user.username,
              profile_pic: user.profile_pic,
              user_id: user.id
            });
          } else {
            return res.send("password incorrect");
          }
        }
      });
      return res.send("email does not exist");
    })
    .catch(err => {
      console.log(err);
    });
});



app.get("/api/reviews", (req, res) => {
  dbHelpers.getAllReviews()
    .then(reviews => {
      res.send(reviews);
    })
    .catch(error => {
      console.log(error);
    });
});
app.get("/api/reviews/home", (req, res) => {
  dbHelpers
    .getNewReviews()
    .then(response => {
      res.json({ data: response });
    })
    .catch(error => {
      console.log(error);
    });
});

app.post("/api/reviews/:id", (req, res) => {
  dbHelpers.getReviewsPerBusiness(req.params.id)
    .then(reviews => {
      res.send(reviews);
    })
    .catch(error => { console.log(error); });
});

app.listen(PORT, () => {
  console.log('listening on ', PORT);
});

app.post("/reviews/new", (req, res) => {
  let userId;
  let exists = false;
  dbHelpers.getIdByUsername(req.body.username)
    .then(response => {
      console.log("username", req.body.username);
      console.log('response', response);
      userId = response[0].id;
    })
    .then(() => {
      dbHelpers.hasUserMadeAPreviousReview(userId, req.body.venue_id)
        .then(response => {
          console.log(response);
          if (response) {
            exists = true;
            res.send("can't make another review for the same venue");
          }
        })
        .then(() => {
          if (exists === false) {
            dbHelpers.submitReview(
              userId,
              req.body.venue_id,
              req.body.venue_name,
              req.body.cleanliness,
              req.body.socialDistancing,
              req.body.transactionProcess,
              req.body.description,
              req.body.overall_rating)
              .then(review => {
                res.send(review);
              })
              .catch(error => console.log(error));
          }
        });
    });
});

app.post("/reviews/helpful", (req, res) => {
  let userId;
  let exists = false;
  dbHelpers.getIdByUsername(req.body.username)
    .then(response => {
      userId = response[0].id;
    })
    .then(() => {
      dbHelpers.checkIfLikesExist(req.body.id, userId)
        .then(response => {
          if (response.length > 0) {
            exists = true;
          }
        })
        .then(() => {
          if (exists === false) {
            dbHelpers.addLikes(req.body.id, userId)
              .then(() => {
                console.log("heyyyyyyy");
                dbHelpers.increaseHelpfulCount(req.body.id)
                  .then(() => {
                    return res.send("add");
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
          } else if (exists === true) {
            console.log("did it work?");
            dbHelpers.deleteLikes(req.body.id, userId)
              .then(() => {
                dbHelpers.descreaseHelpfulCount(req.body.id)
                  .then(() => {
                    res.send("delete");
                  });
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
    });
});

app.get('/api/users/public', (req, res) => {
  dbHelpers
    .getAllUsersImages()
    .then(response => {
      return res.json({ data: response });
    })
    .catch(er => console.log(er));
});

app.get('/api/users/:id/rating_chart', (req, res) => {

  dbHelpers
    .getUserRatingChart(req.params.id)
    .then(response => res.json({ data: response }));
});

app.get('/api/reviews/users/:id', (req, res) => {
  dbHelpers
    .getProfileReviews(req.params.id)
    .then(response => {
      res.json({ data: response });
    })
    .catch(er => console.log(er));
});

app.get('/api/favs/users/:id', (req, res) => {
  dbHelpers
    .getProfileFavs(req.params.id)
    .then(response =>
      res.json({ data: response }))
    .catch(er => console.log(er));
});
