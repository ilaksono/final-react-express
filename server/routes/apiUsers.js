const router = require("express").Router();

module.exports = () => {
  router.get('/', (req, res) => {
    
    res.json();
  })

  return router;
}
