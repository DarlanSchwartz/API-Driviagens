export function isValidDateFormat(date) {
    if(!date) return false;
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    return dateRegex.test(date);
}

export function dateBiggerThan(smallerDate,biggerDate) {
    if(!smallerDate || !biggerDate) return false;
    const partesData = smallerDate.split("-");
    const formatedReceivedDate = new Date(partesData[2], partesData[1] - 1, partesData[0]);
    return formatedReceivedDate > biggerDate;
}

export function dateBiggerThanFormatBoth(smallerDate,biggerDate) {
    if(!smallerDate || !biggerDate) return false;
    const smallerDateParts = smallerDate.split("-");
    const biggerDateParts = biggerDate.split("-");
    const formatedReceivedSmallerDate = new Date(smallerDateParts[2], smallerDateParts[1] - 1, smallerDateParts[0]);
    const formatedReceivedBiggerDate = new Date(biggerDateParts[2], biggerDateParts[1] - 1, biggerDateParts[0]);
    return formatedReceivedSmallerDate <= formatedReceivedBiggerDate;
}