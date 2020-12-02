INSERT INTO users(username, email, password, city)
VALUES ('DannyBoy', 'test7@test.ca', 'password', 'Montreal'),
('try guy', 'test8@test.ca', 'password', 'Montreal'),
('Mr.Magoo', 'test9@test.ca', 'password', 'Montreal'),
('Mrs. Robinson', 'test10@test.ca', 'password', 'Montreal'),
('Eddie', 'test11@test.ca', 'password', 'Montreal'),
('Bro', 'test13@test.ca', 'password', 'Montreal'),
('Petite Prince', 'test13@test.ca', 'password', 'Montreal'),
('Gen X', 'test14@test.ca', 'password', 'Montreal'),
('HabsFan', 'test15@test.ca', 'password', 'Montreal'),
('ChckenLittle', 'test16@test.ca', 'password', 'Montreal');

INSERT INTO reviews (user_id, venue_id, venue_name, description, overall_rating, 
cleanliness, socialDistancing, transactionProcess, date)
VALUES (1, 'Uotfj7HlJoNRp1pVv3AnDw', 'Starbucks', 'acceptable', 3, 3, 3, 3, '2020-11-30 00:02:03'),
(2, 'Uotfj7HlJoNRp1pVv3AnDw', 'Starbucks', 'I was hoping for better', 3, 3, 3, 3, '2020-11-30 00:02:03'),
(3, 'Uotfj7HlJoNRp1pVv3AnDw', 'Starbucks', 'Not great', 2, 2.5, 4, 3.5, '2020-11-29 00:02:03'),
(4, 'Uotfj7HlJoNRp1pVv3AnDw', 'Starbucks', 'Mehh....', 3, 2, 3, 2, '2020-11-28 00:02:03'),
(5, 'Uotfj7HlJoNRp1pVv3AnDw', 'Starbucks', 'Mehh....', 3, 2, 3, 2, '2020-11-28 00:02:03'),
(6, 'oZ-KO8nCnSeSwGvN8OVgsg', 'Rockaberry', 'Not amazing', 3, 2, 3, 2, '2020-11-28 00:02:03'),
(10, 'oZ-KO8nCnSeSwGvN8OVgsg', 'Rockaberry', 'Average...', 3, 3, 3, 3, '2020-11-30 00:02:03'),
(1, 'oZ-KO8nCnSeSwGvN8OVgsg', 'Rockaberry', 'I thought they did a decent job', 3, 4, 3, 4, '2020-10-01 00:02:03'),
(2, 'RsnANpovUnrwSohyo5x4_Q', 'Première Moisson', 'I thought they did a decent job', 3, 4, 3, 3, '2020-10-01 00:02:03'),
(3, 'RsnANpovUnrwSohyo5x4_Q', 'Première Moisson', 'I thought they did a decent job', 3, 4, 3, 3, '2020-11-01 00:02:03'),
(10, 'RsnANpovUnrwSohyo5x4_Q', 'Première Moisson', 'I thought they did a decent job', 3, 4, 3, 3, '2020-11-25 00:02:03'),
(5, 'RsnANpovUnrwSohyo5x4_Q', 'Première Moisson', 'I thought they did a decent job', 3, 4, 3, 3, '2020-12-01 00:02:03'),
(6, 'FQ9Q_WmEcAjHeyLzGq86mg', 'Cora', 'I thought they did a decent job', 4, 4, 4, 4, '2020-11-01 00:02:03'),
(7, 'FQ9Q_WmEcAjHeyLzGq86mg', 'Cora', 'Pretty safe!', 4, 4, 4, 4, '2020-11-05 00:02:03'),
(1, 'FQ9Q_WmEcAjHeyLzGq86mg', 'Cora', 'Acceptable to me', 4, 4, 4, 4, '2020-11-10 00:02:03'),
(2, 'FQ9Q_WmEcAjHeyLzGq86mg', 'Cora', 'Thought it was pretty safe, it is not easy during a pandemic to keep things safe ', 4.5, 5, 4, 4.5, '2020-11-20 00:02:03'),
(3, 'FQ9Q_WmEcAjHeyLzGq86mg', 'Cora', 'Felt very safe!', 5, 4, 4, 4, '2020-11-25 00:02:03'),
(4, 'FQ9Q_WmEcAjHeyLzGq86mg', 'Cora', 'Quite COVID conscious', 4.5, 4, 4, 4, '2020-11-25 00:02:03'),
(8, 'FQ9Q_WmEcAjHeyLzGq86mg', 'Cora', 'pas pire pas pire...', 4, 4, 4, 4, '2020-11-27 00:02:03'),
(9, 'FQ9Q_WmEcAjHeyLzGq86mg', 'Cora', 'Very good! A benchmark for how all restaurants should act', 5, 4.5, 5, 5, '2020-11-30 00:02:03'),
(10, 'FQ9Q_WmEcAjHeyLzGq86mg', 'Cora', 'I must say it was a pleasant and safe experience! I am very satisfied', 5, 5, 5, 5, '2020-12-01 00:02:03');

INSERT INTO liked_reviews(review_id, user_id) 
VALUES (7, 1),
(7, 3),
(7, 4),
(7, 5),
(7, 6),
(21, 1),
(21, 3),
(21, 4),
(21, 5),
(21, 6),
(21, 8),
(21, 9),
(21, 10);

INSERT INTO favourited_businesses(venue_id, user_id)
VALUES('FQ9Q_WmEcAjHeyLzGq86mg', 2),
('FQ9Q_WmEcAjHeyLzGq86mg', 10)
;

