var fs = require('fs');
var files = fs.readdirSync('lib');
var expect = require('chai').expect;
var holiday_jp = require('./../release/holiday_jp'); // test release build

describe('holiday_jp', function(){
  it('should have New Year\'s Day(2009-01-01) between 2009-01-01 and 2009-01-31', function(){
    var holidays = holiday_jp.between(new Date('2009-01-01'), new Date('2009-01-31'));
    var new_year_day = holidays[0];
    expect(new_year_day['date'] == new Date('2009-01-01'));
  });
  
  it('should have valid version', function(){
    expect(holiday_jp.VERSION).to.match(/^[0-9]+\.[0-9]+\.[0-9]+$/);
  });

  it('should be holiday 2011-09-19', function(){
    expect(holiday_jp.isHoliday(new Date('2011-09-19'))).to.eq(true);
  });

  it('should not be holiday 2011-09-18', function(){
    expect(holiday_jp.isHoliday(new Date('2011-09-18'))).to.not.eq(true);
  });
});

