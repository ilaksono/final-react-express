# SafeSpace App

A yelp-like application for reviewing places based on covid safety practices. Uses Express server handling with yelp-fusion api and pg postgres-database. Built by Andrew Markham, Daniel Shaefer and myself(Ian Laksono).

## Front-End Frameworks:
- Material-UI v4.11.0
- Combobox v0.12.0

## Front-end Dependencies
- React v17.0
- Material UI v4.11.0
- Combobox v0.12.0
- @react-google-maps/api
- node-sass
- chartjs
- axios
- react-static-google-map

## Server Dependencies
- Nodejs v10.x
- Express v4.x
- pg
- request-promise-native
- yelp-fusion
- cors
- yelp autocomplete
- google-maps places library

## The following custom hooks can be found in 'src/hooks':
- `useApplicationData`: Reducer which maintains and updates client data and home page state.
- `useAutoComplete`: State which updates and controls the venue autocomplete interaction with yelp autocomplete api
- `useChartData`: State which updates and controls the Chart component
- `useFilter`: State which updates and controls the filter switches in Search Page 
- `useLocationAuto`: State which updates and controls the location autocomplete interacting with google maps/places api
- `useMapData`: State which updates and controls the map object, panning, and marker subcomponents
- `usePagination`: State which updates and controls results and pages displayed
- `useProfileData`: State which controls the data displayed on user profile pages
- `useRefinedData`: Reducer that updates, filters and controls the results listed in the middle section of the search page
-  `useYelpData`: State that updates, sorts, and maintains the yelp api search results from venue search, and business ID end points

### Server-API can be found in `/server` 

### Screenshots:

!["Home Page"](https://github.com/ilaksono/safe-space/blob/master/ssdocs/home-page.jpg)
!["Profile Page"](https://github.com/ilaksono/safe-space/blob/master/ssdocs/profile-page.jpg)
!["Search Page"](https://github.com/ilaksono/safe-space/blob/master/ssdocs/search-page.jpg)


### Deployment

Deployed on netlify:
https://safespace-a.netlify.app/

API deployed on heroku: 
https://safespace-laksono.herokuapp.com/

## My Role:
- Deploying
- Creating project
- Architecture of Database Design
- Researching Back-end middleware
- Organizing express router
- Researching Front-end APIs
- Integrating react-router and context
- Solving back-end bottlenecks
- Front-end error handling
- Creating and managing Google Map and places API
- Creating and managing Chart
- Creating and managing Yelp API
- Initialise docs and readme
- Heavy styling of react components
- Creating and managing config and .env files
- Organizing front-end hooks and components

