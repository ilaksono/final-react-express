// // [[0], [1, 2, 3], [4]];
// const data = [
//   {
//     date: 'no-22',
//     val: 3
//   },
//   {
//     date: 'no-23',
//     val: 4
//   },
//   {
//     date: 'no-23',
//     val: 2
//   },
//   {
//     date: 'no-23',
//     val: 1
//   },
//   {
//     date: 'no-24',
//     val: 5
//   },
//   {
//     date: 'no-24',
//     val: 1
//   }
// ];

// const func = (data) => {
//   const arr = [];
//   let temp = [];
//   const dates = [];
//   const obj = {};
//   data.forEach((ele, index) => {
//     if (!dates.includes(ele.date)) {
//       dates.push(ele.date);
//       // temp.push(index);
//       obj[ele.date] = [ele.val];
//     } 
//     // else if (index + 1 < data.length) {
//     //   if (data[index + 1].date === ele.date) {
//     //     temp.push(index + 1)
//     //   } else {
//     //     arr.push(temp)
//     //     temp = [];
//     //   }
//     // }
//     else {
//       arr.push(temp);
//       temp = [];
//       temp.push(index);
//       obj[ele.date].push(ele.val);
//     }

//   });
//   if (temp.length)
//     arr.push(temp);
//   console.log(temp, 'temp');
//   console.log(arr, 'arr');
//   console.log(obj);

//   const a = Object.values(obj).map(ar => {
//     return ar.reduce((acc,v) => acc + v, 0) / ar.length
//   })

//   console.log(a);

//   return dates;
// };


// console.log(func(data));


const test = () => {
  
  const months = ['J', 'F', 'M','A', 'May', 'J', 'J', "A", 'S',"O", "n","D"];
  return months[new Date().getMonth()];

}

console.log(test());