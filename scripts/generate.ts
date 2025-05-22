import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as yaml from 'js-yaml';
import moment from 'moment';
import { Holiday } from '../src/types';

const typePath = path.join(__dirname, '../src/types');

/**
 * Write holidays data to a TypeScript file
 * @param file_name Output file path
 * @param holidays Holidays data
 */
const writeFile = (file_name: string, holidays: Record<string, Holiday>): void => {
  fs.writeFileSync(file_name, /*ts*/`
// Generated from holidays.yml at ${moment().format('YYYY-MM-DD HH:mm:ss')};
import { Holiday } from './${path.relative(path.dirname(file_name), typePath)}';

const holidays = {
${Object.keys(holidays).map((date) => {
    const holiday = holidays[date];
    const dateString = moment(new Date(date)).format('YYYY-MM-DD');
    return `  "${dateString}": {
    date: "${dateString}",
    week: "${holiday.week}",
    week_en: "${holiday.week_en}",
    name: "${holiday.name}",
    name_en: "${holiday.name_en}"
  },`;
  }).join('\n')}
}  as const satisfies Record<string, Holiday>;

export = holidays;
`.trim() + "\n");
};

// Main execution
const holidaysYamlPath = path.join(__dirname, '../holiday_jp/holidays_detailed.yml');
const holidays = yaml.load(fs.readFileSync(holidaysYamlPath, 'utf8')) as Record<string, any>;

// Generate TypeScript files
writeFile(path.join(__dirname, '../src/holidays.ts'), holidays);

// Generate year-specific files
const holidays_every_year = Object.keys(holidays).reduce((holidays_every_year: Record<string, Record<string, any>>, date) => {
  const year = moment(new Date(date)).format('YYYY');
  const holidays_per_year = { ...holidays_every_year[year], [date]: holidays[date] };
  return { ...holidays_every_year, [year]: holidays_per_year };
}, {} as Record<string, Record<string, Holiday>>);

// Create directories if they don't exist
const yearDir = path.join(__dirname, '../src/holidays_every_year');

if (!fs.existsSync(yearDir)) {
  fs.mkdirSync(yearDir, { recursive: true });
}

for (const year of Object.keys(holidays_every_year) as Array<keyof typeof holidays_every_year>) {
  writeFile(`${yearDir}/${year}.ts`, holidays_every_year[year]);
}
