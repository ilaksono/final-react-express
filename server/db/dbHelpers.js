const request = require('request-promise-native');

module.exports = (db) => {
  // search page
  // review count for given venue -- select * from reviews, where venue id is business id, group by venue id  (will need to be done in a function)
  const getAllReviews = () => {
    const queryString = `
    SELECT *
    FROM reviews;
    `;
    const queryParams = [];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  };

  const getReviewsPerBusiness = (id) => {
    const queryString = `
    SELECT *
    FROM reviews
    WHERE venue_id = $1;
    `
    const queryParams = [id]
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows
      })
  };
  // average rating for given venue ISSUE IS THAT WE MAY NOT BE ABLE TO PASS THE ARGUMENT TO THE BACKEND, MAYBE NEED TO FILTER WHAT WE RETURN FROM getallReviews


  // on business show page
  // get all reviews -- select * from reviewers, where venue id is business id, sort by helpful count

  // get avg rating (prop?)
  // get user data for each of the reviews 

  // specific user page
  // all reviews by given user
  const submitReview = (user_id, venue_id, cleanliness, socialDistancing, transactionProcess, description, overall_rating) => {
    const queryString = `
    INSERT INTO reviews (user_id, venue_id, cleanliness, socialDistancing, transactionProcess, description, overall_rating)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `;
    const queryParams = [user_id, venue_id, cleanliness, socialDistancing, transactionProcess, description, overall_rating];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  }

  return {
    getAllReviews,
    submitReview,
    getReviewsPerBusiness
  };
};