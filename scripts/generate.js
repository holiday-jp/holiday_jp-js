var fs = require('fs')
  , util = require('util')
  , yaml = require('js-yaml')
  , moment = require('moment');

var holidays = yaml.safeLoad(fs.readFileSync(__dirname + '/../holiday_jp/holidays.yml', 'utf8'));
var timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
var jsfile = [util.format("// Generated from holidays.yml at %s;", timestamp)];
jsfile.push('exports.holidays = {};');

Object.keys(holidays).forEach(function (date) {
  jsfile.push("exports.holidays['" + moment(new Date(date)).format('YYYY-MM-DD') + "'] = {");
  jsfile.push("  'date': '" + moment(new Date(date)).format('YYYY-MM-DD') + "',");
  jsfile.push("  'week': '" + holidays[date]['week'] +"',");
  jsfile.push("  'week_en': '" + holidays[date]['week_en'] +"',");
  jsfile.push("  'name': '" + holidays[date]['name'] +"',");
  jsfile.push("  'name_en': \"" + holidays[date]['name_en'] +"\"");
  jsfile.push('};');
});

fs.writeFile(__dirname + '/../lib/holidays.js', jsfile.join("\n"));
