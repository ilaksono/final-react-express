const knex = require('./knex')

module.exports = () =>  {
  const test = () => {
    return knex.select('*').from('places');
  }
  

  return {
    test
  }
}