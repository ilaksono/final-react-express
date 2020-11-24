DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS liked_reviews CASCADE;
DROP TABLE IF EXISTS favourited_businesses CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  profile_pic VARCHAR(255) DEFAULT 'https://britarchschools.com/img/founder.png',
  created_at timestamp NOT NULL DEFAULT Now(),
  city VARCHAR(255) NOT NULL DEFAULT 'Toronto'
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  venue_id VARCHAR(255) NOT NULL,
  venue_name VARCHAR(255) NOT NULL,
  date timestamp NOT NULL DEFAULT Now(),
  helpful_count INTEGER DEFAULT 0,
  cleanliness  NUMERIC(3, 1),
  socialDistancing NUMERIC(3, 1),
  transactionProcess NUMERIC(3, 1),
  overall_rating NUMERIC(3, 1) NOT NULL,
  description VARCHAR(255),
  deleted BOOLEAN DEFAULT false
);

CREATE TABLE liked_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  review_id INTEGER REFERENCES reviews(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamp NOT NULL DEFAULT Now()
);

CREATE TABLE favourited_businesses (
  id SERIAL PRIMARY KEY NOT NULL,
  venue_id VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamp NOT NULL DEFAULT Now()
);

