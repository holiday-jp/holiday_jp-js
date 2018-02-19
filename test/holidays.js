var fs = require('fs');
var files = fs.readdirSync('lib');
var expect = require('chai').expect;
var yaml = require('js-yaml');
var holidays = require('./../lib/holidays');

var TESTSET_DIR = __dirname + '/../holiday_jp/';

describe('holidays', function(){
  it('holidays should be holiday all holidays_detailed.yml', function(){
    var testset = yaml.safeLoad(fs.readFileSync(TESTSET_DIR + 'holidays_detailed.yml', 'utf8'));
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
  });
});
