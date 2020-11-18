## User Stories ##
Need to have
* As a user I can register to create a new account
* As a user I can login to my account to view businesses I've reviewed
* As a user I can search businesses using a map, searching a specific business name, by category (restaurants, coffee shops, parks, etc)
* As a user I can filter businesses by COVID rating, delivery type (eg curbside pickup, delivery, take-out, in-store), type of business, whether it's currently open
* As a user I can sort search results by highest COVID rating, most reviewed. If there are no COVID reviews for a business, it sorts it by google review rating
* As a user I can view a specific business page with information about the business, a map of its location, 
* As an authenticated user I can leave a review on how COVID-safe a business is

Nice to have
* As a business, I can manage my page, change my delivery type (curbside pickup)


## Routes ##
  * GET '/' -> background image with search bar
  * GET '/login' -> renders login form
  * POST '/login' -> checks if successful login; redirects to home page
  * POST '/logout' -> redirects to home page
  * GET '/register' -> renders register form
  * POST '/register' -> checks if successful register; redirects to home page
  * GET '/users/:id' -> view user account and their reviews
  * GET '/search/?param=string' -> renders list of businesses and a map, filters, sort by
  * POST '/places/:id/review' -> create a review for place-id, redirects to business page (or home page?)
  * GET '/places/:id/review/new' -> get form to create review for place-id
  * GET '/places/:id' -> renders business specific page for place-id, and all reviews for that place
  * GET '/api/reviews/:id' 


## To Do ##

1. Build ERD
2. 
* Search
  * search by business name
  * search a location (pre-populated and default city is user location)
  * search by map
* Navbar
  * logo
  * search business, search location bars + search button
  * login / register buttons
* Business
  * 
