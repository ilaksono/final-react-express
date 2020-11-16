INSERT INTO users (username, email, password) VALUES (
  'maps4life', 'test@test.ca', 'asd');

INSERT INTO categories (description) VALUES ('restaurant', 'bar', 'bathroom');

INSERT INTO places (name, address, description) VALUES (
  'Pizza Pizza', '123 Main St.', 'A pizza place'
);

INSERT INTO categories_places (place_id, category_id) 
VALUES (1, 1),
  (1, 2);
INSERT INTO reviews (date, title, description, rating, user_id)
VALUES (now(), "Awesome Pizza", 'Hot and cheesy', 5, 1);