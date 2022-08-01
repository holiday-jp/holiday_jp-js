/**
 * The type definition of a holiday
 * @see https://github.com/holiday-jp/holiday_jp-js/blob/master/lib/holidays.js
 */
export interface Holiday<T extends Date | string = Date> {
  /**
   * Expression of Date object or Date string
   */
  date: T;
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
 * holidays
 */
export const holidays: Record<string, Holiday<string>>

/**
 * Set holiday list
 * @param holidays_every_years Selected holiday dataset
 * @returns undefined
 */
 export function setHolidays(holidays_every_years: Holiday<string>[]): void;

/**
 * Set holiday list
 * @param holidays Selected holiday list
 * @returns undefined
 */
 export function isContainHolidays(date: Date): boolean;

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
