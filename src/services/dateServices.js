function isValidDateFormat(date) {
    if (!date) return false;
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    return dateRegex.test(date);
}

function dateBiggerThan(smallerDate, biggerDate) {
    if (!smallerDate || !biggerDate) return false;
    return formatDate(smallerDate) > biggerDate;
}

function dateBiggerThanFormatBoth(smallerDate, biggerDate) {
    if (!smallerDate || !biggerDate) return false;
    return formatDate(smallerDate) > formatDate(biggerDate);
}

function formatDate(date) {
    const dateParts = date.split("-");
    return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
}

export {
    formatDate, dateBiggerThan, dateBiggerThanFormatBoth, isValidDateFormat
}