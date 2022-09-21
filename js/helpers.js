// HELPERS
export function formatDate(date) {
    const formatDate = new Date(date)
        .toDateString()
        .split(' ')
        .slice(-3)
        .join(' ');

    return formatDate.substring(0, formatDate.length - 5).concat(', ') + formatDate.substring(formatDate.length, formatDate.length - 4);
}

export function countStatus(val, status, arr) {
    return arr.filter(item => item.noteStatus === status && item.category === val).length;
}