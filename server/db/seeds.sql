INSERT INTO users(username, email, password)
VALUES ('DannyBoy', 'test1@test.ca', 'password'),
('IanBein', 'test2@test.ca', 'password'),
('Androo', 'test3@test.ca', 'password'),
('Dog The Bounty Hunter', 'test4@test.ca', 'password'),
('Maurice Richarde', 'test5@test.ca', 'password'),
('Beyonce', 'test6@test.ca', 'password'),
('Lil Pimp', 'test7@test.ca','password'),
('The Brade Bunch', 'test8@test.ca', 'password');

INSERT INTO reviews (user_id, venue_id, description, overall_rating, cleanliness, socialDistancing, transactionProcess)
VALUES (1, '1Hvm57g7zTpBR2hhFg8awQ', 'Hot and cheesy', 5, 5, 5, 5),
(2,'J6qWt6XIUmIGFHX5rQJA-w', 'not bad',4, 3, 4, 5),
(3, '7hcxAsYC5R8BIcm1xQ_1_Q', 'not bad',5, 5, 5, 5),
(4,'o6Yor6ofIw2TqM3mN28Kzg', 'not bad',3, 2, 5, 4),
(5,'O_UC_izJXcAmkm6HlEyGSA', 'not bad',4, 3, 4, 5),
(6,'O_UC_izJXcAmkm6HlEyGSA', 'bad',4, 3, 4, 5),
(7,'O_UC_izJXcAmkm6HlEyGSA', 'not bad',1, 4, 4,3),
(8,'eYeFOcNJO2iTNPCPi8XAxw', 'not bad',2, 1, 4, 1);
