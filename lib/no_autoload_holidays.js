var package_info = require('./../package.json');
var format = require('./format');

// Object.assign by Babel plugin
// https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-object-assign
var assign = function () {
  _extends = Object.assign
    ? Object.assign.bind()
    : function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
  return _extends.apply(this, arguments);
};

var holiday_jp = {
  VERSION: package_info.version,
  holiday_years: [],
  holidays: {},
  setHolidays: function (holidays_every_years) {
    var holiday_years = [];
    var holidays = {};
    holidays_every_years.forEach(function (holidays_every_year) {
      assign(holidays, holidays_every_year);
      var year = new Date(Object.keys(holidays_every_year)[0]).getFullYear();
      holiday_years.push(year);
    });
    this.holiday_years = holiday_years;
    this.holidays = holidays;
  },
  isContainHolidays: function (date) {
    if (date instanceof Date) {
      date = format(date);
    }
    var year = new Date(date).getFullYear();
    return this.holiday_years.includes(year);
  },
  between: function (start, last) {
    if (!this.isContainHolidays(start) || !this.isContainHolidays(last)) throw new Error('Not contained in the holiday dataset');

    var holidays = this.holidays;
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
  isHoliday: function (date) {
    if (!this.isContainHolidays(date)) throw new Error('Not contained in the holiday dataset');

    if (date instanceof Date) {
      date = format(date);
    }
    if (this.holidays[date]) {
      return true;
    }
    return false;
  },
};

module.exports = holiday_jp;
