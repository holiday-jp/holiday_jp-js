var package_info = require('json!./../package.json');
var holidays = require('./holidays');

var holiday_jp = {
  VERSION: package_info.version,
  between: function(start, last) {
    var selected = [];
    var d;
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
      var year = date.getFullYear();
      var month = ('0' + (date.getMonth() + 1)).slice(-2);
      var day = ('0' + (date.getDate())).slice(-2);
      date = year + '-' + month + '-' + day;
    }
    if (holidays[date]) {
      return true;
    }
    return false;
  }
};

module.exports = holiday_jp;
