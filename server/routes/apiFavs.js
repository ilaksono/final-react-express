const router = require('express').Router();


module.exports = (dbHelpers) => {
  router.get('/users/:id', (req, res) => {
    dbHelpers
      .getProfileFavsName(req.params.id)
      .then(response =>
        res.json({
          data: response
        }))
      .catch(er => console.log(er));
  });

  router.post("/", (req, res) => {
    dbHelpers.addToFavourites(req.body.id, req.body.user_id)
      .then(response => {
        res.json({
          data: response
        });
      })
      .catch(err => console.log(err));
  });

  router.delete('/', (req, res) => {
    dbHelpers
      .removeFromFavourites(req.body.biz_id, req.body.user_id)
      .then(response => {
        res.json({
          data: response
        });
      });
  });
  return router;
};