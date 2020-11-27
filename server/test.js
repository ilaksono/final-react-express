require('@tensorflow/tfjs');
const toxicity = require('@tensorflow-models/toxicity');
const threshold = 0.9;

// Load the model. Users optionally pass in a threshold and an array of
// labels to include.
toxicity.load(threshold).then(model => {
  // const sentences = ['you suck you\'re a fuckikng ugly piece of shit go die you retarded loser, no one likes you'];
  const sentences = ['ass']
  model.classify(sentences)
  .then(predictions => {
    // `predictions` is an array of objects, one for each prediction head,
    // that contains the raw probabilities for each input along with the
    // final prediction in `match` (either `true` or `false`).
    // If neither prediction exceeds the threshold, `match` is `null`.

   console.log(predictions.some(pre => pre.results[0].match ))
  //  predictions.forEach(pre => console.log(pre.results[0].match))
    // console.log(predictions);
  })
})
.catch(er => console.log(er));