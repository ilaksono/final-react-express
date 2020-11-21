DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL,
  venue_id VARCHAR(255) NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT Now(),
  helpful_count INTEGER DEFAULT 0,
  cleanliness  NUMERIC(3, 1),
  socialDistancing NUMERIC(3, 1),
  transactionProcess NUMERIC(3, 1),
  overall_rating NUMERIC(3, 1) NOT NULL,
  description VARCHAR(255),
  deleted BOOLEAN DEFAULT false
);

