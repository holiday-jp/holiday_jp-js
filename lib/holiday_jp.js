var package_info = require('./../package.json');
var holidays = require('./holidays');
var format = require('./format');

var holiday_jp = {
  VERSION: package_info.version,
  holidays: holidays,
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
