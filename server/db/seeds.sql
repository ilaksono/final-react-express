INSERT INTO users(username, email, password, city, profile_pic)
VALUES ('DannyBoy', 'test1@test.ca', 'password', 'Montreal', 'https://vengreso.com/wp-content/uploads/2016/03/LinkedIn-Profile-Professional-Picture-Sample-Bernie-Borges.png'),
('IanBein', 'test2@test.ca', 'password', 'Toronto', 'https://www.fairtravel4u.org/wp-content/uploads/2018/06/sample-profile-pic.png'),
('Androo', 'test3@test.ca', 'password', 'Toronto', 'https://cdn-images.zety.com/authors/christian_eilers_1.jpg'),
('Dog The Bounty Hunter', 'test4@test.ca', 'password', 'Vancouver', 'https://www.headshotsprague.com/wp-content/uploads/2019/07/Headshots_Prague-emotional-portrait-of-a-smiling-entrepreneur-1.jpg'),
('Maurice Richarde', 'test5@test.ca', 'password', 'New York', 'https://dspncdn.com/a1/media/692x/7f/6a/2e/7f6a2e37bc1365bf37403821ffc8d958.jpg'),
('Beyonce', 'test6@test.ca', 'password', 'Hollywood', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkWm-hMmPyzdDP6M8LzB1RlaGJkZ1om8zRkg&usqp=CAU'),
('Lil Pimp', 'test7@test.ca','password', 'Detroit', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ93ak3v27x77a6YRkWqLWlAnvhm06VwngXEQ&usqp=CAU'),
('The Brade Bunch', 'test8@test.ca', 'password', 'Log Angeles', 'https://swca.s3.amazonaws.com/4/g/54d177632ecc1f9f788389f3.2.w314.jpg');

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