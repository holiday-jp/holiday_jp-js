"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const package_json_1 = __importDefault(require("../package.json"));
const format_1 = __importDefault(require("./format"));
const holiday_jp = {
    VERSION: package_json_1.default.version,
    holiday_years: [],
    holidays: {},
    setHolidays: function (holidays_every_years) {
        const holiday_years = [];
        const holidays = {};
        holidays_every_years.forEach(function (holidays_every_year) {
            Object.assign(holidays, holidays_every_year);
            const year = new Date(Object.keys(holidays_every_year)[0]).getFullYear();
            holiday_years.push(year);
        });
        this.holiday_years = holiday_years;
        this.holidays = holidays;
    },
    isContainHolidays: function (date) {
        if (date instanceof Date) {
            date = (0, format_1.default)(date);
        }
        const year = new Date(date).getFullYear();
        return this.holiday_years.includes(year);
    },
    between: function (start, end) {
        if (!this.isContainHolidays(start) || !this.isContainHolidays(end)) {
            throw new Error('Not contained in the holiday dataset');
        }
        const holidaysData = this.holidays;
        const startDate = new Date((0, format_1.default)(start));
        const endDate = new Date((0, format_1.default)(end));
        const selected = [];
        Object.keys(holidaysData).forEach((date) => {
            const holiday = holidaysData[date];
            const d = new Date(holiday.date);
            if (startDate <= d && d <= endDate) {
                selected.push(Object.assign(Object.assign({}, holiday), { date: d }));
            }
        });
        return selected;
    },
    isHoliday: function (date) {
        if (!this.isContainHolidays(date)) {
            throw new Error('Not contained in the holiday dataset');
        }
        if (date instanceof Date) {
            date = (0, format_1.default)(date);
        }
        if (this.holidays[date]) {
            return true;
        }
        return false;
    },
};
module.exports = holiday_jp;
