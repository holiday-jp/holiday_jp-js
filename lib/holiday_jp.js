var package_info = require('./../package.json');
var holidays = require('./holidays');

function format(date) {
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + (date.getDate())).slice(-2);
  return (year + '-' + month + '-' + day);
}

var holiday_jp = {
  VERSION: package_info.version,
  between: function(start, last) {
    var selected = [];
    var d;
    start = new Date(format(start));
    last = new Date(format(last));
    Object.keys(holidays).forEach(function (date) {
      d = new Date(holidays[date]['date']);
      if (start <= d && d <= last) {
        holidays[date]['date'] = d;
        selected.push(holidays[date]);
      }
    });
    return selected;
  },

  isHoliday: function(date) {
    if (date instanceof Date) {
      date = format(date);
    }
    if (holidays[date]) {
      return true;
    }
    return false;
  }
};

module.exports = holiday_jp;
