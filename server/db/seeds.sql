INSERT INTO users(username, email, password, city)
VALUES ('DannyBoy', 'test1@test.ca', 'password', 'Montreal'),
('IanBein', 'test2@test.ca', 'password', 'Toronto'),
('Androo', 'test3@test.ca', 'password', 'Toronto'),
('Dog The Bounty Hunter', 'test4@test.ca', 'password', 'Vancouver'),
('Maurice Richarde', 'test5@test.ca', 'password', 'New York'),
('Beyonce', 'test6@test.ca', 'password', 'Hollywood'),
('Lil Pimp', 'test7@test.ca','password', 'Detroit'),
('The Brade Bunch', 'test8@test.ca', 'password', 'Log Angeles');

INSERT INTO reviews (user_id, venue_id, venue_name, description, overall_rating, 
cleanliness, socialDistancing, transactionProcess)
VALUES (1, '1Hvm57g7zTpBR2hhFg8awQ', 'La Touche','Hot and cheesy', 5, 5, 5, 5),
(2,'J6qWt6XIUmIGFHX5rQJA-w', 'L''Avenue', 'not bad',4, 3, 4, 5),
(3, '7hcxAsYC5R8BIcm1xQ_1_Q', 'Birria Catrina', 'not bad',5, 5, 5, 5),
(4,'o6Yor6ofIw2TqM3mN28Kzg', 'Tacos El Asador', 'not bad',3, 2, 5, 4),
(5,'O_UC_izJXcAmkm6HlEyGSA', 'Playa Cabana', 'not bad',4, 3, 4, 5),
(6,'O_UC_izJXcAmkm6HlEyGSA','Playa Cabana', 'bad',4, 3, 4, 5),
(7,'O_UC_izJXcAmkm6HlEyGSA','Playa Cabana', 'not bad',1, 4, 4,3),
(8,'eYeFOcNJO2iTNPCPi8XAxw','El Pocho Antojitos Bar', 'not bad',2, 1, 4, 1),
(1,'eYeFOcNJO2iTNPCPi8XAxw','El Pocho Antojitos Bar', 'this isn''t even a toxic review' ,2, 1, 4, 1);


INSERT INTO favourited_businesses (venue_id, user_id)
VALUES ('1Hvm57g7zTpBR2hhFg8awQ', 1),
('J6qWt6XIUmIGFHX5rQJA-w', 1);