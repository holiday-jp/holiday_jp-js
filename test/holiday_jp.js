var { describe, it } = require("node:test")
var { strictEqual, match } = require("node:assert")
var yaml = require('js-yaml');
var holiday_jp = require('./../lib/holiday_jp');
var HOLIDAYS_DETAIL_URL = 'https://raw.githubusercontent.com/holiday-jp/holiday_jp/master/holidays_detailed.yml';

describe('holiday_jp', function () {

  it('should have valid version', function () {
    match(holiday_jp.VERSION, /^[0-9]+\.[0-9]+\.[0-9]+$/);
  });

  it('.between should have New Year\'s Day(2009-01-01) between 2009-01-01 and 2009-01-31', function () {
    var holidays = holiday_jp.between(new Date('2009-01-01'), new Date('2009-01-31'));
    var new_year_day = holidays[0];
    strictEqual(new_year_day['date'].getTime(), new Date('2009-01-01').getTime());
  });

  it('.between should be holiday', function () {
    var holidays = holiday_jp.between(new Date('2009-01-01'), new Date('2009-01-31'));
    var new_year_day = holidays[0];
    strictEqual(new_year_day['date'].getTime(), new Date('2009-01-01').getTime());
  });

  it('.isHoliday should be holiday returns date is holiday or not', function () {
    strictEqual(holiday_jp.isHoliday(new Date('2011-09-19')), true);
    strictEqual(holiday_jp.isHoliday(new Date('2011-09-18')), false);
  });

  it('should be Mountain Day from 2016', function () {
    strictEqual(holiday_jp.isHoliday(new Date('2015-08-11')), false);
    for (year = 2016; year <= 2050; year++) {
      if (year == 2020 || year == 2021) {
        strictEqual(holiday_jp.isHoliday(new Date(year + '-08-11')), false);
      } else {
        strictEqual(holiday_jp.isHoliday(new Date(year + '-08-11')), true);
      }
    }
  });

  it('.between should have holiday between 2014-09-23 00:00:01 and 2014-09-23 00:00:01', function () {
    var holidays = holiday_jp.between(new Date(2014, 8, 23, 0, 0, 1), new Date(2014, 8, 23, 0, 0, 1));
    strictEqual(holidays.length, 1);
  });

  it('.isHoliday should be holiday all holidays_detailed.yml', function (_, done) {
    fetch(HOLIDAYS_DETAIL_URL)
      .then(res => res.text())
      .then(body => {
        var testset = yaml.safeLoad(body);
        Object.keys(testset).forEach(function (key) {
          strictEqual(holiday_jp.isHoliday(new Date(key)), true);
        });
        done();
      });
  });

  it('should not change the type of holiday_jp.holidays[date].date after calling between()', function () {
    const dateKey = '2010-09-20';
    const beforeType = typeof holiday_jp.holidays[dateKey].date;
    strictEqual(beforeType, 'string', 'date should be string before calling between()');

    const holidays = holiday_jp.between(new Date('2010-09-14'), new Date('2010-09-21'));

    const afterType = typeof holiday_jp.holidays[dateKey].date;
    strictEqual(afterType, 'string', 'date should remain string after calling between()');

    const resultHoliday = holidays.find(h => {
      const d = h.date;
      const year = d.getFullYear();
      const month = ('0' + (d.getMonth() + 1)).slice(-2);
      const day = ('0' + d.getDate()).slice(-2);
      const formattedDate = year + '-' + month + '-' + day;
      return formattedDate === dateKey;
    });
    strictEqual(resultHoliday.date instanceof Date, true, 'date in between() result should be Date object');
  });
});
