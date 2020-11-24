const day = new Date("2020-11-23T19:55:23.327Z").toUTCString().split('')
.slice(5, 11).join('').replace(' ', '-')
// .splice(3,0,'-').join('');

console.log(day);