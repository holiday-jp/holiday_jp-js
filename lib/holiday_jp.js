"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const package_json_1 = __importDefault(require("../package.json"));
const holidays_1 = __importDefault(require("./holidays"));
const format_1 = __importDefault(require("./format"));
const holiday_jp = {
    VERSION: package_json_1.default.version,
    holidays: holidays_1.default,
    /**
     * Find holidays between parameters
     * @param start Start date to find holiday
     * @param end End date to find holiday
     * @returns The holiday list between start and end, or empty if none
     */
    between: function (start, end) {
        const startDate = new Date((0, format_1.default)(start));
        const endDate = new Date((0, format_1.default)(end));
        const selected = [];
        Object.keys(holidays_1.default).forEach((date) => {
            const holiday = holidays_1.default[date];
            const d = new Date(holiday.date);
            if (startDate <= d && d <= endDate) {
                selected.push(Object.assign(Object.assign({}, holiday), { date: d }));
            }
        });
        return selected;
    },
    /**
     * Check if parameter is holiday
     * @param date A reference to be checked against holiday
     * @returns True if the provided reference is holiday otherwise false
     */
    isHoliday: function (date) {
        if (date instanceof Date) {
            date = (0, format_1.default)(date);
        }
        // 型安全なチェック方法に変更
        return Object.keys(holidays_1.default).includes(date);
    }
};
module.exports = holiday_jp;
