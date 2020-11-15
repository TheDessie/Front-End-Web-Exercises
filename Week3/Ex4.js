function isGreaterThan10(num) {
    return num > 10;
}
function doubleNum(num) {
    return num * 2;
}

let arr = [10, 5, 13, 18, 51];
let resArr1 = arr.filter(isGreaterThan10);
let resArr2 = arr.map(doubleNum);
console.log(resArr1.length >= 1);
console.log(resArr2.length >= 1);
