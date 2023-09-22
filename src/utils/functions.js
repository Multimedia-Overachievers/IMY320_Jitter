
export function formatSeconds(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor(seconds / 60);

    return `${hours}h ${minutes}m`;
}

export function formatTimer(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    return `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${remainingSeconds}s`;
}

export function GetModuleCode(moduleIndex) {
    // eslint-disable-next-line default-case
    switch (parseInt(moduleIndex)) {
        case 0:
            return 'imy320';
        case 1:
            return 'imy310';
        case 2:
            return 'cos333';
        case 3:
            return 'cos314';
    }
}

/**
 * This function takes in an array of numbers and returns the average
 * @param {*} array 
 * @returns 
 */
export function getAverage(array) {
    if (array === undefined || array.length === 0) {
        return 0;
    }
    let sum = array.reduce((a, b) => a + b, 0);
    let avg = sum / array.length;

    return Math.round(avg * 10) / 10;
}

/**
 * This function takes in an average and returns the color class
 * @param {float} average 
 * @returns 
 */
export function getAverageColor(average) {
    if (average < 50) {
        return 'info'
    } else if (average < 70) {
        return 'warning'
    } else {
        return 'success'
    }
}

export function shuffle(array, count) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array.slice(0, count);
}