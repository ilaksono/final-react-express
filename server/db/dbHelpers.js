const request = require('request-promise-native');
const ipify = 'https://api.ipify.org/?format=json';

module.exports = (db) => {
  
/*   const loadAllMaps = function () {
    const queryString = `
    SELECT maps.id,MAX(latitude) - MIN(latitude) as lat_spread,MAX(longitude) - MIN(longitude) as lng_spread, AVG(latitude) AS center_latitude, AVG(longitude) AS center_longitude, maps.title, maps.description, maps.date_created, users.username
    FROM maps
    JOIN markers ON map_id = maps.id
    JOIN users ON users.id = maps.owner_id
    WHERE maps.deleted = false
    AND markers.deleted = false
    GROUP BY maps.id, users.id
    ORDER BY maps.id ASC;
    `;
    const queryParams = [];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  }; */


  return {
    /* fetchLatlngByIP */
  };
};