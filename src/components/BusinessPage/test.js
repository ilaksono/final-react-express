
const convertDate = date => {

  return (new Date(date)
    .toISOString().slice(0, 10).replace('T', ' '));
};


console.log(convertDate('2020-11-23T02:47:17.661Z'));
console.log(new Date('2020-11-23T02:47:17.661Z').getTime());

console.log(new Date('2020-11-23T02:47:17.661Z').getDay());
console.log(new Date('2020-11-23T02:47:17.661Z').getHours())