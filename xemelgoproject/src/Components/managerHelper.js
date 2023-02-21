const dayjs = require('dayjs');
var duration = require('dayjs/plugin/duration')
dayjs.extend(duration);

function timeWorked(start, end) {
    var day1 = dayjs(start);
    var day2 = dayjs(end);
    var duration = day2.diff(day1, 'hours', true);
    return duration; 
}

module.exports = {
    timeWorked
}