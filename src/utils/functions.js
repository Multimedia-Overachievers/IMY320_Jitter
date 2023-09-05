// Function to convert minutes (80 minutes) into format 1h 20m
export function formatMinutes(minutes) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
}

export function getAverage(array) {
    if (array === undefined || array.length === 0) {
        return 0;
    }
    let sum = array.reduce((a, b) => a + b, 0);
    let avg = sum / array.length;

    return avg;
}