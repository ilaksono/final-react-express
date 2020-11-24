const request = require('request-promise-native');

module.exports = (db) => {
  
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
    JOIN users ON users.id = user_id
    WHERE venue_id = $1;
    `;
    const queryParams = [id]
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows
      })
  };
  
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
  };

  const getIdByUsername = (username) => {
    const queryString = `
    SELECT id 
    FROM users
    WHERE username = $1;
    `;
    const queryParams = [username];
    return db.query(queryString, queryParams)
      .then (response => {
        return response.rows
      });
  };

  const hasUserMadeAPreviousReview = (id, venue_id) => {
    const queryString = `
    SELECT user_id
    FROM reviews 
    WHERE user_id = $1 AND venue_id = $2;
    `;
    const queryParams = [id, venue_id]
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows[0]
      })
  };

  const updateHelpfulCount = (id) => {
    const queryString = `
    UPDATE reviews
    SET helpful_count = helpful_count + 1
    where id = $1;
    `;
    const queryParams = [id]
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows
      })
  };

  const registration = (username, email, password) => {
    const queryString = `
    INSERT INTO users (username, email, password)
    VALUES($1, $2, $3)
    RETURNING *;
    `;
    const queryParams = [username, email, password];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows
      })
  };

  const serverRegistrationValidation = () => {
    const queryString = `
    SELECT username, email 
    FROM users;
    `;
    return db.query(queryString)
      .then(response => {
        return response.rows
      })
  }

  const serverLoginValidation = () => {
    const queryString = `
    SELECT *
    FROM users;
    `;
    return db.query(queryString)
    .then(response => {
      return response.rows
    })
  };

  const checkIfLikesExist = (id, reviewId) => {
    const queryString = `
    SELECT * 
    FROM liked_reviews
    WHERE user_id = $1 AND review_id = $2;
    `
    const queryParams = [id, reviewId];

    return db.query(queryString, queryParams)
    .then(response => {
      return response.rows
    })
  };

  const getReviewIdByVenueAndUser = (userId, venue_id) => {
    const queryString = `
    SELECT id 
    FROM reviews
    WHERE user_id = $1 AND venue_id = $2;
    `
    const queryParams = [userId, venue_id]

    return db.query(queryString, queryParams)
    .then(response => {
      return response.rows
    })
  };

  const addLikes = (reviewId, userId) => {
    const queryString = `
    INSERT INTO liked_reviews (user_id, review_id)
    VALUES($1, $2);
    `
    const queryParams = [reviewId, userId];

    return db.query(queryString, queryParams)
    .then(response => {
      return response.rows[0]
    })
  }


  return {
    getAllReviews,
    submitReview,
    getIdByUsername,
    getReviewsPerBusiness,
    updateHelpfulCount,
    registration,
    serverRegistrationValidation,
    serverLoginValidation,
    hasUserMadeAPreviousReview,
    checkIfLikesExist,
    getReviewIdByVenueAndUser,
    addLikes
  };
};