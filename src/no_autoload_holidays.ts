import packageInfo from '../package.json';
import format from './format';
import { Holiday } from './types';

const holiday_jp = {
  VERSION: packageInfo.version,
  holiday_years: [] as number[],
  holidays: {} as Record<string, Holiday>,
  setHolidays: function (holidays_every_years: Record<string, Holiday>[]) {
    const holiday_years: number[] = [];
    const holidays: Record<string, Holiday> = {};

    holidays_every_years.forEach(function (holidays_every_year) {
      Object.assign(holidays, holidays_every_year);
      const year = new Date(Object.keys(holidays_every_year)[0]).getFullYear();
      holiday_years.push(year);
    });

    this.holiday_years = holiday_years;
    this.holidays = holidays;
  },
  isContainHolidays: function (date: Date | string) {
    if (date instanceof Date) {
      date = format(date);
    }
    const year = new Date(date).getFullYear();
    return this.holiday_years.includes(year);
  },
  between: function (start: Date, end: Date): Holiday<Date>[] {
    if (!this.isContainHolidays(start) || !this.isContainHolidays(end)) {
      throw new Error('Not contained in the holiday dataset');
    }

    const holidaysData = this.holidays;
    const startDate = new Date(format(start));
    const endDate = new Date(format(end));

    const selected: Holiday<Date>[] = [];
    Object.keys(holidaysData).forEach((date) => {
      const holiday = holidaysData[date as keyof typeof holidaysData];
      const d = new Date(holiday.date);
      if (startDate <= d && d <= endDate) {
        selected.push({
          ...holiday,
          date: d
        });
      }
    });
    return selected;
  },
  isHoliday: function (date: Date | string) {
    if (!this.isContainHolidays(date)) {
      throw new Error('Not contained in the holiday dataset');
    }

    if (date instanceof Date) {
      date = format(date);
    }

    if (this.holidays[date]) {
      return true;
    }

    return false;
  },
};

export = holiday_jp;
