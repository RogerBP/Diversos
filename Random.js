function getRandom(min, max) {
    let r = Math.random();
    let m = (max - min);
    let res = r * m + min;
    return res;
}

function getRandomColor() {
    let r = Math.floor(getRandom(0, 255));
    let g = Math.floor(getRandom(0, 255));
    let b = Math.floor(getRandom(0, 255));
    let c = "rgb(" + r + "," + g + "," + b + ")";
    return c;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}