export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date( parseInt(time) )
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

export function countFilter() {
    return 2
}

export function constantFilter(value) {
    if( value == 1 ) return '原创';
    if( value == 2 ) return '转载';
}

export function monthFilter(value) {
    if( value == 1 ) return 'January';
    if( value == 2 ) return 'February';
    if( value == 3 ) return 'March';
    if( value == 4 ) return 'April';
    if( value == 5 ) return 'May';
    if( value == 6 ) return 'June';
    if( value == 7 ) return 'July';
    if( value == 8 ) return 'August';
    if( value == 9 ) return 'September';
    if( value == 10 ) return 'October';
    if( value == 11 ) return 'November';
    if( value == 12 ) return 'December';
}