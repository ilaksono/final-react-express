import axios from 'axios';

const userData = [
  {
    username: 'Test User',
    email: 'test@test.ca',
    password: 'password'
  }
];

const axiosRegister = ({username, email, password}) => {
  // return axios
  // .post('/api/register', {data});

  return new Promise((res, rej) => {
    userData.push({username, email, password})
    res({username, email, password});
  });
};

export default axiosRegister;