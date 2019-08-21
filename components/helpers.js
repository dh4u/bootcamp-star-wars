// lifted from https://stackoverflow.com/questions/8378870/generating-unique-random-numbers-integers-between-0-and-x and using a modification lifted from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function generateRange(pCount, pMin, pMax) {
    const min = pMin < pMax ? pMin : pMax;
    const max = pMax > pMin ? pMax : pMin;
    var resultArr = [], randNumber;
    while ( pCount > 0) {
        randNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if (resultArr.indexOf(randNumber) == -1) {
            resultArr.push(randNumber);
            pCount--;
        }
    }
    //console.log(resultArr);
    return resultArr;
}
export default generateRange