import packageInfo from '../package.json';
import holidaysData from './holidays';
import format from './format';
import { Holiday } from './types';

const holiday_jp = {
  VERSION: packageInfo.version,
  holidays: holidaysData,

  /**
   * Find holidays between parameters
   * @param start Start date to find holiday
   * @param end End date to find holiday
   * @returns The holiday list between start and end, or empty if none
   */
  between: function (start: Date, end: Date): Holiday<Date>[] {
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

  /**
   * Check if parameter is holiday
   * @param date A reference to be checked against holiday
   * @returns True if the provided reference is holiday otherwise false
   */
  isHoliday: function (date: Date | string): boolean {
    if (date instanceof Date) {
      date = format(date);
    }
    // 型安全なチェック方法に変更
    return Object.keys(holidaysData).includes(date);
  }
};

export = holiday_jp;
