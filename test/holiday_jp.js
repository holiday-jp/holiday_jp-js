var request = require('request');
var expect = require('chai').expect;
var yaml = require('js-yaml');
var holiday_jp = require('./../release/holiday_jp'); // test release build

var HOLIDAYS_DETAIL_URL = 'https://raw.githubusercontent.com/holiday-jp/holiday_jp/master/holidays_detailed.yml';

describe('holiday_jp', function(){

  it('should have valid version', function(){
    expect(holiday_jp.VERSION).to.match(/^[0-9]+\.[0-9]+\.[0-9]+$/);
  });

  it('.between should have New Year\'s Day(2009-01-01) between 2009-01-01 and 2009-01-31', function(){
    var holidays = holiday_jp.between(new Date('2009-01-01'), new Date('2009-01-31'));
    var new_year_day = holidays[0];
    expect(new_year_day['date'] == new Date('2009-01-01'));
  });

  it('.between should be holiday', function(){
    var holidays = holiday_jp.between(new Date('2009-01-01'), new Date('2009-01-31'));
    var new_year_day = holidays[0];
    expect(new_year_day['date'] == new Date('2009-01-01'));
  });

  it('.isHoliday should be holiday returns date is holiday or not', function(){
    expect(holiday_jp.isHoliday(new Date('2011-09-19'))).to.eq(true);
    expect(holiday_jp.isHoliday(new Date('2011-09-18'))).to.not.eq(true);
  });

  it('should be Mountain Day from 2016', function(){
    expect(holiday_jp.isHoliday(new Date('2015-08-11'))).to.not.eq(true);
    for (year = 2016; year <= 2050; year++) {
      if (year == 2020) {
        expect(holiday_jp.isHoliday(new Date(year + '-08-11'))).to.not.eq(true);
      } else {
        expect(holiday_jp.isHoliday(new Date(year + '-08-11'))).to.eq(true);
      }
    }
  });

  it('.between should have holiday between 2014-09-23 00:00:01 and 2014-09-23 00:00:01', function(){
    var holidays = holiday_jp.between(new Date(2014, 8, 23, 0, 0, 1), new Date(2014, 8, 23, 0, 0, 1));
    expect(holidays.length).to.eq(1);
  });

  it('.isHoliday should be holiday all holidays_detailed.yml', function(done){
    request(HOLIDAYS_DETAIL_URL, function (error, response, body) {
      var testset = yaml.safeLoad(body);
      Object.keys(testset).forEach(function (key) {
        expect(holiday_jp.isHoliday(new Date(key))).to.eq(true);
      });
      done();
    })
  });
});
