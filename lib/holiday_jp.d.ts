/**
 * The type definition of a holiday
 * @see https://github.com/holiday-jp/holiday_jp-js/blob/master/lib/holidays.js
 */
export interface Holiday {
  /**
   * Expression of Date object
   */
  date: Date;
  /**
   * Day of the week in Japanese
   */
  week: string;
  /**
   * Day of the week in English
   */
  week_en: string;
  /**
   * Holiday name in Japanese
   */
  name: string;
  /**
   * Holiday name in English
   */
  name_en: string;
}

/**
 * The version of this package
 */
export const VERSION: string

/**
 * Find holidays between parameters
 * @param start Start date to find holiday
 * @param end End date to find holiday
 * @returns The holiday list between start and end, or empty if none
 */
export function between(start: Date, end: Date): Holiday[];

/**
 * Check if parameter is holiday
 * @param date A reference to be checked against holiday
 * @returns True if the provided reference is holiday otherwise false
 */
export function isHoliday(date: Date): boolean;
