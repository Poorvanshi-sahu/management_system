function isValidISODate(dateString) {
    // Check ISO format YYYY-MM-DD
    const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoRegex.test(dateString)) return false;

    // Parse date
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return false;

    // Additional check: parsed date must match original parts
    const [year, month, day] = dateString.split("-").map(Number);

    return (
        date.getUTCFullYear() === year &&
        date.getUTCMonth() + 1 === month &&
        date.getUTCDate() === day
    );
}

module.exports = isValidISODate