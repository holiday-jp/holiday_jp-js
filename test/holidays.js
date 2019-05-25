var expect = require('chai').expect;
var request = require('request');
var yaml = require('js-yaml');
var holidays = require('./../lib/holidays');

var HOLIDAYS_DETAIL_URL = 'https://raw.githubusercontent.com/holiday-jp/holiday_jp/master/holidays_detailed.yml';

describe('holidays', function(){
  it('holidays should be holiday all holidays_detailed.yml', function(done){
    request(HOLIDAYS_DETAIL_URL, function (error, response, body) {
      var testset = yaml.safeLoad(body);
      function format(date) {
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + (date.getDate())).slice(-2);
        return (year + '-' + month + '-' + day);
      }
      Object.keys(testset).forEach(function (key) {
        var d = format(new Date(key));
        expect(holidays[d].name).to.eq(testset[key].name);
      });
      done();
    });
  });
});
