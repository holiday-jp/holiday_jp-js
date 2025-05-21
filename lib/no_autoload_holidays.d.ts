import { Holiday } from './types';
declare const holiday_jp: {
    VERSION: string;
    holiday_years: number[];
    holidays: Record<string, Holiday>;
    setHolidays: (holidays_every_years: Record<string, Holiday>[]) => void;
    isContainHolidays: (date: Date | string) => boolean;
    between: (start: Date, end: Date) => Holiday<Date>[];
    isHoliday: (date: Date | string) => boolean;
};
export = holiday_jp;
