const request = require('request-promise-native');

module.exports = (db) => {

  const getAllReviews = () => {
    const queryString = `
    SELECT reviews.*, users.username
    FROM reviews
    JOIN users ON (users.id = reviews.user_id)
    WHERE deleted = false;
    `;
    const queryParams = [];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  };

  const getReviewsPerBusiness = (id) => {
    const queryString = `
    SELECT reviews.*, username, users.profile_pic
    FROM reviews
    JOIN users ON users.id = user_id
    WHERE venue_id = $1 AND deleted = FALSE;
    `;
    const queryParams = [id];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  };

  const submitReview = async (user_id, venue_id, venue_name, cleanliness, socialDistancing, transactionProcess, description, overall_rating) => {
    const queryString = `
    INSERT INTO reviews (user_id, venue_id, venue_name, cleanliness, socialDistancing, transactionProcess, description, overall_rating)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `;

    const queryParams = [user_id, venue_id, venue_name, cleanliness, socialDistancing, transactionProcess, description, overall_rating];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });

  };

  const editReviews = async (reviewId, user_id, venue_id, venue_name, cleanliness, socialDistancing, transactionProcess, description, overall_rating) => {
    const queryString = `
    UPDATE reviews
    SET venue_id = $3, venue_name = $4, cleanliness = $5, socialDistancing = $6, transactionProcess = $7
    , description = $8, overall_rating = $9
    WHERE id = $1 and user_id = $2
    RETURNING *;
    `;
    const queryParams = [reviewId, user_id, venue_id, venue_name, cleanliness, socialDistancing, transactionProcess, description, overall_rating];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows[0];
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
      .then(response => {
        return response.rows;
      });
  };

  const hasUserMadeAPreviousReview = (id, venue_id) => {
    const queryString = `
    SELECT user_id
    FROM reviews 
    WHERE user_id = $1 AND venue_id = $2 AND deleted = FALSE;
    `;
    const queryParams = [id, venue_id];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows[0];
      });
  };

  const increaseHelpfulCount = (id) => {
    const queryString = `
    UPDATE reviews
    SET helpful_count = helpful_count + 1
    where id = $1;
    `;
    const queryParams = [id];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  };

  const getAllUsersImages = () => {
    const queryString = `
      SELECT users.id, username, profile_pic, city, SUM(reviews.helpful_count) as total, users.created_at
      FROM users 
      LEFT JOIN reviews ON users.id = user_id
      GROUP BY users.id; 
    `;
    return db.query(queryString, [])
      .then(response => response.rows);

  };
  const getUserRatingChart = (id) => {
    const queryString = `
    SELECT overall_rating 
    FROM reviews 
    WHERE user_id = $1 AND deleted = FALSE
    `;
    const queryParams = [Number(id)];
    return db
      .query(queryString, queryParams)
      .then(res => res.rows);
  };
  const getProfileReviews = (id) => {
    const queryString = `
      SELECT * FROM reviews
      WHERE user_id = $1 AND deleted = FALSE;
      `;
    const queryParams = [Number(id)];
    return db
      .query(queryString, queryParams)
      .then(res => res.rows);
  };

  const getProfileFavs = (id) => {
    const qs = `
    SELECT favourited_businesses.*, reviews.venue_name 
    FROM favourited_businesses
    JOIN reviews ON reviews.venue_id = favourited_businesses.venue_id 
    WHERE favourited_businesses.user_id = $1 AND deleted = false;
    `;
    return db
      .query(qs, [Number(id)])
      .then(res => res.rows);
  };

  const getProfileFavsName = (id) => {
    const qs = 
    `
    SELECT *
    FROM favourited_businesses
    WHERE user_id = $1;
    `;
    return db
    .query(qs, [Number(id)])
    .then(res => res.rows);
  }

  const getLikesByUser = (id) => {
    const queryString = `
    SELECT liked_reviews.*, reviews.id
    FROM liked_reviews
    JOIN reviews ON reviews.id = liked_reviews.review_id
    WHERE liked_reviews.user_id = $1;
    `;
    const queryParams = [Number(id)];
    return db
      .query(queryString, queryParams)
      .then(res => res.rows);
  };

  const descreaseHelpfulCount = (id) => {
    const queryString = `
    UPDATE reviews
    SET helpful_count = helpful_count - 1
    where id = $1;
    `;
    const queryParams = [id];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  };

  const registration = (username, email, password, city) => {
    const queryString = `
    INSERT INTO users (username, email, password , city)
    VALUES($1, $2, $3, $4)
    RETURNING *;
    `;
    const queryParams = [username, email, password, city];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  };

  const serverRegistrationValidation = () => {
    const queryString = `
    SELECT username, email 
    FROM users;
    `;
    return db.query(queryString)
      .then(response => {
        return response.rows;
      });
  };

  const serverLoginValidation = (email) => {
    const queryString = `
    SELECT *
    FROM users
    WHERE email = $1;
    `;
    const queryParams = [email]
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows[0];
      });
  };

  const checkIfLikesExist = (reviewId, userId) => {
    const queryString = `
    SELECT * 
    FROM liked_reviews
    WHERE review_id = $1 AND user_id = $2;
    `;
    const queryParams = [reviewId, userId];

    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  };

  const getReviewIdByVenueAndUser = (userId, venue_id) => {
    const queryString = `
    SELECT id 
    FROM reviews
    WHERE user_id = $1 AND venue_id = $2;
    `;
    const queryParams = [userId, venue_id];

    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  };

  const addLikes = (reviewId, userId) => {
    const queryString = `
    INSERT INTO liked_reviews (review_id, user_id)
    VALUES($1, $2)
    RETURNING *;
    `;
    const queryParams = [reviewId, userId];

    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows[0];
      });
  };

  const deleteLikes = (reviewId, userId) => {
    const queryString = `
    DELETE
    FROM liked_reviews
    WHERE review_id = $1 AND user_id = $2
    RETURNING *;
    `;
    const queryParams = [reviewId, userId];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });

  };

  const getNewReviews = () => {
    const qs = `
      SELECT reviews.*, users.username, users.profile_pic FROM reviews
      JOIN users on users.id = reviews.user_id
      WHERE deleted = FALSE
      ORDER BY date DESC
      LIMIT 4;`;
    return db
      .query(qs, [])
      .then(res => res.rows);
  };

  const deleteReviews = (reviewId, userId) => {
    console.log("request received?");
    const queryString = `
    UPDATE reviews
    SET deleted = true
    WHERE id = $1 AND user_id = $2;
    `;
    const queryParams = [reviewId, userId];
    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  };

  const addToFavourites = (venue_id, user_id) => {
    const queryString = `
    INSERT INTO favourited_businesses(venue_id, user_id)
    VALUES($1, $2)
    RETURNING *;
    `;

    const queryParams = [venue_id, user_id];

    return db.query(queryString, queryParams)
      .then(response => {
        return response.rows;
      });
  };
  const removeFromFavourites = (biz_id, user_id) => {
    const qs = `
    DELETE FROM favourited_businesses
    WHERE venue_id = $1 AND user_id = $2
    `;
    const qp = [biz_id, Number(user_id)];
    return db
      .query(qs, qp)
      .then(res => res.rows)
      .catch(er => console.log(er));
  };


  return {
    getAllReviews,
    submitReview,
    getIdByUsername,
    getReviewsPerBusiness,
    getAllUsersImages,
    getUserRatingChart,
    getProfileReviews,
    increaseHelpfulCount,
    registration,
    serverRegistrationValidation,
    serverLoginValidation,
    hasUserMadeAPreviousReview,
    checkIfLikesExist,
    getReviewIdByVenueAndUser,
    addLikes,
    deleteLikes,
    descreaseHelpfulCount,
    getNewReviews,
    getProfileFavs,
    deleteReviews,
    editReviews,
    getLikesByUser,
    addToFavourites,
    removeFromFavourites,
    getProfileFavsName
  };
};