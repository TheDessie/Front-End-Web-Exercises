
let arr = [10, 5, 13, 18, 51];
let reducer = (accumulator, currentValue) => accumulator + currentValue;
let res = arr.reduce(reducer);
console.log(res);