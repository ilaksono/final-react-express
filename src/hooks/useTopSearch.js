import { useState } from 'react';
import axios from 'axios';


const initTops = [];

const useTopSearch = () => {
  const [tops, setTops] = useState(initTops);

  const getTops = () => {
    return new Promise((res, rej) => {
      const width = '95%';
      const example = [];
      example.push({
        venue: 'hot-dog',
        title: 'hot-dog',
        width
      });
      example.push({
        venue: 'Dog Park',
        title: 'Dog Park',
        width

      });
      example.push({
        venue: 'andrew',
        title: 'andrew',
        width

      });
      example.push({
        venue: 'daniel',
        title: 'daniel',
        width

      });
      const pArr = example.map((ex) => {
        return axios.post('/api/search_one', { venue: ex.venue, location: 'toronto' });
      });
      return Promise.all(pArr)
        .then((all) => {
          all.forEach((each, index) => {
            console.log(each);
            example[index].location = 'toronto'
            example[index].url = each.data[0].image_url;
          });
          return setTops(example);
        });
    });
  };

  return {
    tops,
    getTops
  };
};

export default useTopSearch;