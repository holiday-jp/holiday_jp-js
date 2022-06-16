const fs = require('fs')
  , util = require('util')
  , yaml = require('js-yaml')
  , moment = require('moment');

const holidays = yaml.safeLoad(fs.readFileSync(`${__dirname}/../holiday_jp/holidays_detailed.yml`, 'utf8'));
const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
const jsfile = [util.format("// Generated from holidays.yml at %s;", timestamp)];
jsfile.push('var holidays = {};');

Object.keys(holidays).forEach((date) => {
  jsfile.push(`holidays['${moment(new Date(date)).format('YYYY-MM-DD')}'] = {`);
  jsfile.push(`  'date': '${moment(new Date(date)).format('YYYY-MM-DD')}',`);
  jsfile.push(`  'week': '${holidays[date]['week']}',`);
  jsfile.push(`  'week_en': '${holidays[date]['week_en']}',`);
  jsfile.push(`  'name': '${holidays[date]['name']}',`);
  jsfile.push(`  'name_en': "${holidays[date]['name_en']}"`);
  jsfile.push('};');
});
jsfile.push('module.exports = holidays;');

fs.writeFileSync(`${__dirname}/../lib/holidays.js`, jsfile.join("\n"));
