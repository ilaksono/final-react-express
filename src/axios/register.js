import axios from 'axios';

const axiosRegister = (data) => {
  return axios
  .post('/api/register', {data});
}

export default axiosRegister