export function isValidDateFormat(date) {
    if (!date) return false;
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    return dateRegex.test(date);
}

export function dateBiggerThan(smallerDate, biggerDate) {
    if (!smallerDate || !biggerDate) return false;
    return formatDate(smallerDate) > biggerDate;
}

export function dateBiggerThanFormatBoth(smallerDate, biggerDate) {
    if (!smallerDate || !biggerDate) return false;
    return formatDate(smallerDate) > formatDate(biggerDate);
}

export function formatDate(date) {
    const dateParts = date.split("-");
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
}