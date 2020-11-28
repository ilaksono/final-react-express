const router = require('express').Router();


module.exports = (dbHelpers) => {

  router.get("/", (req, res) => {
    dbHelpers.getAllReviews()
      .then(reviews => {
        res.send(reviews);
      })
      .catch(error => {
        console.log(error);
      });
  });

  router.post("/helpful", (req, res) => {
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
                  dbHelpers.increaseHelpfulCount(req.body.id)
                    .then(() => {
                      return res.send("add");
                    })
                    .catch(err => {
                      console.log(err);
                    });
                });
            } else if (exists === true) {
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
  router.post("/edit", (req, res) => {
    dbHelpers.editReviews(
      req.body.id,
      req.body.user_id,
      req.body.venue_id,
      req.body.venue_name,
      req.body.cleanliness,
      req.body.socialDistancing,
      req.body.transactionProcess,
      req.body.description,
      req.body.overall_rating
    )
      .then((response) => {
        return res.send(response);
      })
      .catch(err => {
        console.log(err);
      });
  });
  router.post("/new", (req, res) => {
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

  router.post("/delete", (req, res) => {
    dbHelpers.deleteReviews(req.body.id, req.body.user_id)
      .then((response) => {
        return res.json(response);
      })
      .catch(err => {
        console.log("error:", err);
      });
  });

  router.get("/home", (req, res) => {
    dbHelpers
      .getNewReviews()
      .then(response => {
        res.json({
          data: response
        });
      })
      .catch(error => {
        console.log(error);
      });
  });

  router.post("/:id", (req, res) => {
    dbHelpers.getReviewsPerBusiness(req.params.id)
      .then(reviews => {
        res.send(reviews);
      })
      .catch(error => {
        console.log(error);
      });
  });
  router.get('/users/:id', (req, res) => {
    dbHelpers
      .getProfileReviews(req.params.id)
      .then(response => {
        res.json({
          data: response
        });
      })
      .catch(er => console.log(er));
  });
  return router;
};