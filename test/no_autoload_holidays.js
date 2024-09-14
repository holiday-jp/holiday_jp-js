var { describe, it } = require("node:test")
var { strictEqual, deepStrictEqual, notStrictEqual, match, throws } = require("node:assert")
var holiday_jp = require('../lib/no_autoload_holidays');
var holidays_1970 = require('../lib/holidays_every_year/1970');
var holidays_1971 = require('../lib/holidays_every_year/1971');
var holidays_1972 = require('../lib/holidays_every_year/1972');

describe('no_autoload', function () {
  it('should have valid version', function () {
    match(holiday_jp.VERSION, /^[0-9]+\.[0-9]+\.[0-9]+$/);
  });

  it('.isContainHolidays returns true if holiday dataset contains specified date', function () {
    holiday_jp.setHolidays([holidays_1970, holidays_1971, holidays_1972]);
    strictEqual(holiday_jp.isContainHolidays(new Date('1970-01-01')), true);
  });

  it('.isContainHolidays returns false if holiday dataset does not contain specified date', function () {
    holiday_jp.setHolidays([holidays_1970, holidays_1971, holidays_1972]);
    strictEqual(holiday_jp.isContainHolidays(new Date('1973-01-01')), false);
  });

  it('.setHolidays', function () {
    holiday_jp.setHolidays([holidays_1970]);
    deepStrictEqual(holiday_jp.holiday_years, [1970]);
    notStrictEqual(holiday_jp.holidays, []);
  });

  it('.between throw error if holiday dataset does not contain specified date', function () {
    holiday_jp.setHolidays([holidays_1970, holidays_1971, holidays_1972]);
    throws(holiday_jp.between.bind(holiday_jp, new Date('1970-01-01'), new Date('1973-01-31'))), new Error(
      'Not contained in the holiday dataset'
    );
  });

  it('.between should be holiday', function () {
    holiday_jp.setHolidays([holidays_1970, holidays_1971, holidays_1972]);
    var holidays = holiday_jp.between(new Date('1970-01-01'), new Date('1970-01-31'));
    var new_year_day = holidays[0];
    strictEqual(new_year_day['date'].getTime(), new Date('1970-01-01').getTime());
  });

  it('.isHoliday throw error if holiday dataset does not contain specified date', function () {
    holiday_jp.setHolidays([holidays_1970, holidays_1971, holidays_1972]);
    throws(holiday_jp.isHoliday.bind(holiday_jp, new Date('1973-01-31')), new Error(
      'Not contained in the holiday dataset'
    ));
  });

  it('.isHoliday should be holiday returns date is holiday or not', function () {
    holiday_jp.setHolidays([holidays_1970, holidays_1971, holidays_1972]);
    strictEqual(holiday_jp.isHoliday(new Date('1970-01-01')), true);
    strictEqual(holiday_jp.isHoliday(new Date('1970-01-02')), false);
  });
});
