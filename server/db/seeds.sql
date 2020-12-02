INSERT INTO users(username, email, password, city)
VALUES ('DannyBoy', 'test7@test.ca', 'password', 'Montreal'),
('try guy', 'test8@test.ca', 'password', 'Montreal'),
('Mr.Magoo', 'test9@test.ca', 'password', 'Montreal'),
('Mrs. Robinson', 'test10@test.ca', 'password', 'Montreal'),
('Eddie', 'test11@test.ca', 'password', 'Montreal'),
('Freddie', 'test12@test.ca', 'password', 'Montreal'),
('Benny', 'test13@test.ca', 'password', 'Montreal');

INSERT INTO reviews (user_id, venue_id, venue_name, description, overall_rating, 
cleanliness, socialDistancing, transactionProcess, date)
VALUES (7, 'Uotfj7HlJoNRp1pVv3AnDw', 'Starbucks', 'acceptable', 3, 3, 3, 3, '2020-11-30 00:02:03'),
(8, 'Uotfj7HlJoNRp1pVv3AnDw', 'Starbucks', 'I was hoping for better', 3, 3, 3, 3, '2020-11-30 00:02:03'),
(9, 'Uotfj7HlJoNRp1pVv3AnDw', 'Starbucks', 'Not great', 2, 2.5, 4, 3.5, '2020-11-29 00:02:03'),
(10, 'Uotfj7HlJoNRp1pVv3AnDw', 'Starbucks', 'Mehh....', 3, 2, 3, 2, '2020-11-28 00:02:03'),
(10, 'Uotfj7HlJoNRp1pVv3AnDw', 'Starbucks', 'Mehh....', 3, 2, 3, 2, '2020-11-28 00:02:03'),
(1, 'oZ-KO8nCnSeSwGvN8OVgsg', 'Rockaberry', 'Not amazing', 3, 2, 3, 2, '2020-11-28 00:02:03'),
(3, 'oZ-KO8nCnSeSwGvN8OVgsg', 'Rockaberry', 'Average...', 3, 3, 3, 3, '2020-11-30 00:02:03'),
(6, 'oZ-KO8nCnSeSwGvN8OVgsg', 'Rockaberry', 'I thought they did a decent job', 3, 4, 3, 4, '2020-10-01 00:02:03'),
(7, 'RsnANpovUnrwSohyo5x4_Q', 'Première Moisson', 'I thought they did a decent job', 3, 4, 3, 3, '2020-10-01 00:02:03'),
(2, 'RsnANpovUnrwSohyo5x4_Q', 'Première Moisson', 'I thought they did a decent job', 3, 4, 3, 3, '2020-11-01 00:02:03'),
(3, 'RsnANpovUnrwSohyo5x4_Q', 'Première Moisson', 'I thought they did a decent job', 3, 4, 3, 3, '2020-11-25 00:02:03'),
(8, 'RsnANpovUnrwSohyo5x4_Q', 'Première Moisson', 'I thought they did a decent job', 3, 4, 3, 3, '2020-12-01 00:02:03'),
(8, 'FQ9Q_WmEcAjHeyLzGq86mg', 'Cora', 'I thought they did a decent job', 3, 4, 4, 4, '2020-11-01 00:02:03'),
(2, 'FQ9Q_WmEcAjHeyLzGq86mg', 'Cora', 'Pretty safe!', 3, 4, 4, 4, '2020-11-05 00:02:03'),
(5, 'FQ9Q_WmEcAjHeyLzGq86mg', 'Cora', 'Acceptable to me', 3, 4, 4, 3.5, '2020-11-10 00:02:03'),
(9, 'FQ9Q_WmEcAjHeyLzGq86mg', 'Cora', 'Thought it was pretty safe, it is not easy during a pandemic to keep things safe ', 4, 5, 4, 4.5, '2020-11-20 00:02:03'),
(1, 'FQ9Q_WmEcAjHeyLzGq86mg', 'Cora', 'solid, when compared with other places i have gone to', 3, 4, 4, 3.5, '2020-11-25 00:02:03');


