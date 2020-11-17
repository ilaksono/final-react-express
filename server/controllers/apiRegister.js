const knex = require('../dbHelpers/knex');
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const apiRegister = (req, res) => {
  console.log(req.body.data, 'here');
  let {username, email, password} = req.body.data;
  password = bcrypt.hashSync(password, salt);

  knex.insert({username, email, password})
  .into('users')
  .then(respon => {
    console.log(respon);
    return respon
  }).catch(er => console.log(er))
};

module.exports = apiRegister;