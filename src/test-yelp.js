const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'EkoF1-eKSzhwegJB-UG8DqUOXkQm8WtEgwt9AMT4AG2eCzNWb5dkGKReVK0aA2MAUvDO2MZBnVLdHHFkuAKDMCDKrHytgMM-dOJFGSs9-T41qYcdo-NH-mpW6_SxX3Yx';

const searchRequest = {
  location: 'montreal, qc',
  limit: 2,
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const prettyJson = JSON.stringify(response, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});

// client.autocomplete({
//   text:''
// }).then(response => {
//   console.log(response.jsonBody);
// }).catch(e => {
//   console.log(e);
// });