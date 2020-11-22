INSERT INTO reviews (user_id, venue_id, description, overall_rating, cleanliness, socialDistancing, transactionProcess)
VALUES (1, '1Hvm57g7zTpBR2hhFg8awQ', 'Hot and cheesy', 5, 5, 5, 5),
(2,'J6qWt6XIUmIGFHX5rQJA-w', 'not bad',4, 3, 4, 5),
(2, '7hcxAsYC5R8BIcm1xQ_1_Q', 'not bad',5, 5, 5, 5),
(2,'o6Yor6ofIw2TqM3mN28Kzg', 'not bad',3, 2, 5, 4),
(2,'O_UC_izJXcAmkm6HlEyGSA', 'not bad',4, 3, 4, 5),
(3,'O_UC_izJXcAmkm6HlEyGSA', 'bad',5, 3, 4, 5),
(4,'O_UC_izJXcAmkm6HlEyGSA', 'good',3, 5, 2, 1),
(5,'O_UC_izJXcAmkm6HlEyGSA', 'not bad',1, 1, 4, 4),
(6,'O_UC_izJXcAmkm6HlEyGSA', 'not bad',1, 4, 4,3),
(2,'o6Yor6ofIw2TqM3mN28Kzg', 'not bad',5, 5, 5, 5),
(2,'eYeFOcNJO2iTNPCPi8XAxw', 'not bad',2, 1, 4, 1),
(2,'dRjU-uxMeInyYgBb61Ap7A', 'not bad',1, 1, 1, 1),
(2,'5T6kFKFycym_GkhgOiysIw', 'not bad',1, 1, 1, 1),
(1, 'U4GJ5BDZd6qp9SOkvbx4Ng', 'great', 5, 5, 4, 2),
(2, 'U4GJ5BDZd6qp9SOkvbx4Ng', 'tacos', 5, 3, 5, 1);
/* CREATE TABLE reviews(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL,
  venue_id VARCHAR(255) NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT Now(),
  description VARCHAR(255),
  helpful_count INTEGER DEFAULT 0,
  overall_rating INTEGER NOT NULL,
  deleted BOOLEAN DEFAULT false
); */

/* '0W4lkclzZThpx3V65bVgig'
'J6qWt6XIUmIGFHX5rQJA-w'
'IhM1UBvAMM5Fia4f_v1wdQ'
  '7hcxAsYC5R8BIcm1xQ_1_Q'
  'o6Yor6ofIw2TqM3mN28Kzg'
  'O_UC_izJXcAmkm6HlEyGSA'
  'PGRVqqPqR2hIZNRLqlPxag'
  'iGEvDk6hsizigmXhDKs2Vg'
  'eYeFOcNJO2iTNPCPi8XAxw'
  'dRjU-uxMeInyYgBb61Ap7A' */