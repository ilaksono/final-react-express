## Project Description ##

SafeSpace is for users who want to search places (businesses, parks, etc) and see how COVID-safe they are. Users can leave reviews for businesses which impacts their Safe Score.

## User Stories ##
​
* Core
  * User can search
  * User can filter by parameters that slim results
  * User can sort and change order
  * User can move map -> markers + results update 
  * User can click business article -> goes to business page -> business get details api request, list of reviews
  * ​user can read and write review
  * user clicks to write a review for a specific business and press Cancel to take them back to the details page
​
* Stretch
  * ​search dropdown/autocomplete -> add debouncing
  * collapseable search results + filter
  * responsive design
  * plotting ratings over time
  * multiple questions with rating as answers -> parts of experience - clean quality, measuring spacing, social experience, service quality, etc...


## DB ##
CREATE TABLE reviews(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL, = "jim"
  venue_id VARCHAR(255) NOT NULL, = "mcdonalds"
  date TIMESTAMPTZ NOT NULL DEFAULT Now(),
  helpful_count INTEGER DEFAULT 0,
  deleted BOOLEAN DEFAULT false
  date_visited TIMESTAMPTZ NOT NULL DEFAULT
  q1
  q2
  q3
  q4
  description
);



