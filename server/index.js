const PORT = process.env.PORT || 8001;
const bodyParser = require('body-parser');
const app = require('express')();
const cookieSession = require("cookie-session");
const apiRegister = require('./controllers/apiRegister');

// app.use('/api/users')
app.use(bodyParser.json());

app.use(cookieSession({
  name: 'session',
  keys: ['secret', 'keyy']
}));

app.get('/api/center', (req, res) => {
  res.json({msg:'hi'});
});
app.get('')

// app.get('/hello', (req, res) => {
//   queries.test()
//   .then(data => {
//     console.log(data);
//     res.json(data);
//   })
// })
app.get('/api/login', (req, res) => {

})

app.post('/api/register', (req, res) => {
  return apiRegister(req, res);
})

app.listen(PORT, () => {
  console.log('listening on ', PORT);
});