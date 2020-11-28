const router = require("express").Router();
const bcrypt = require("bcrypt");


const salt = bcrypt.genSaltSync(10);

module.exports = (dbHelpers) => {

  router.post("/register", (req, res) => {
    const password = bcrypt.hashSync(req.body.password, salt);
    let exists = false;
    dbHelpers.serverRegistrationValidation()
      .then((userData) => {
        userData.forEach(user => {
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
              req.session.user_id = response[0].id;
            })
            .catch(err => {
              console.log("this is the err", err);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });

  });

  router.post("/login", (req, res) => {
    let userID;
    let userDetails;
    dbHelpers.serverLoginValidation()
      .then((userData) => {
        for (const user of userData) {
          if (user.email === req.body.email) {
            userID = user.id;
            if (bcrypt.compareSync(req.body.password, user.password)) {
              userDetails = {
                username: user.username,
                profile_pic: user.profile_pic,
                user_id: userID,
                likes: [],
                favs: []
              };
            } else {
              return res.send("password incorrect");
            }
          }
        }

      })
      .then(() => {
        dbHelpers.getLikesByUser(userID)
          .then(response => {
            userDetails.likes = response;
            console.log(userDetails.likes);
          })
          .then(() => {
            dbHelpers.getProfileFavs(userID)
              .then(response => {
                userDetails.favs = response;
                console.log(userDetails);
              });
            return res.send(userDetails);
          });
      });
  });

  router.post("/data", (req, res) => {
    const data = {"likes": [], "favs": []}
    dbHelpers.getLikesByUser(req.body.id)
    .then(response => {
      data.likes = response;
    })
    .then(() => {
      dbHelpers.getProfileFavs(req.body.id)
      .then(response => {
        data.favs = response
      })
      return res.send(data)
    })
  });

  router.get('/public', (req, res) => {
    dbHelpers
      .getAllUsersImages()
      .then(response => {
        return res.json({
          data: response
        });
      })
      .catch(er => console.log(er));
  });

  router.get('/:id/rating_chart', (req, res) => {

    dbHelpers
      .getUserRatingChart(req.params.id)
      .then(response => res.json({
        data: response
      }));
  });

  return router;
};
