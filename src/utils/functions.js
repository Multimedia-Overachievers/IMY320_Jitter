/**
 * This function takes in time in minutes and returns it in the format 1h 30m
 * @param {integer} minutes 
 * @returns 
 */
export function formatMinutes(minutes) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
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

    return avg;
}

/**
 * This function takes in an average and returns the color class
 * @param {float} average 
 * @returns 
 */
export function getAverageColor(average) {
    if (average < 50) {
        return 'text-danger'
    } else if (average < 70) {
        return 'text-warning'
    } else {
        return 'text-success'
    }
}