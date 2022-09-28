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

export const guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function getDate2Digits(date) {
    // '2022, 9, 25' => ['2022', '9', '25']
    const formatDate = [];
    date.forEach((item) => {
        if (item.length < 2) {
            item = '0'.concat(item);
        }

        formatDate.push(item);
    })

    return formatDate;
}


