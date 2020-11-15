function isDivisibleBy3(num) {
    return num % 3 == 0;
}

let arr = [10, 5, 13, 18, 51];
let resArr = arr.filter(isDivisibleBy3);

for (let i = 0; i < resArr.length; i++) {
    console.log(resArr[i]);
}