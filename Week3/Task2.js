function getDateInfo(pDate) {
    let dDate = new Date(pDate.getTime());
    let day = dDate.getDay();
    dDate.setMonth(dDate.getMonth() + 1);
    dDate.setDate(0);
    let days = dDate.getDate();
    return [day, days];
}

function format(arrInfo) {
    let dateS = arrInfo[0].toLocaleString("bg-BG").substr(0, 10);
    let hoursS = arrInfo[0].getHours();
    if (hoursS < 10) {
        hoursS = "0" + hoursS;
    }
    let minutesS = arrInfo[0].getMinutes();
    if (minutesS < 10) {
        minutesS = "0" + minutesS;
    }
    let secondsS = arrInfo[0].getSeconds();
    if (secondsS < 10) {
        secondsS = "0" + secondsS;
    }

    let timeS = hoursS + ":" + minutesS + ":" + secondsS;

    let dayS;
    switch(arrInfo[1]) {
        case 0:
            dayS = 'неделя';
            break;
        case 1:
            dayS = 'понеделеник';
            break;
        case 2:
            dayS = 'вторник';
            break;
        case 3:
            dayS = 'сряда';
            break;
        case 4:
            dayS = 'четвъртък';
            break;
        case 5:
            dayS = 'петък';
            break;
        case 6:
            dayS = 'събота';
            break;
    }
    return "Дата: " + dateS + ", час: " + timeS + ", " + dayS + ", " + arrInfo[2] + " дни"
}

var date1 = new Date();
var arrDates = [date1];
var date2 = new Date();
date2.setFullYear(2018, 11, 8);
date2.setHours(21, 0, 0, 0);
arrDates.push(date2);

var resArr = arrDates.map(getDateInfo);

for (let i = 0; i < arrDates.length; i++) {
    resArr[i].unshift(arrDates[i]);
}

var result = resArr.map(format);

console.log(result);