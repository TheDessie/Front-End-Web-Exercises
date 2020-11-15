function doubleNum(num) {
    return num * 2;
}

let arr = [10, 5, 13, 18, 51];
let resArr = arr.map(doubleNum);

for (let i = 0; i < resArr.length; i++) {
    console.log(resArr[i]);
}