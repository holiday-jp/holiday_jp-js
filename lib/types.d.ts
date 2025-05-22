/**
 * The type definition of a holiday
 */
export interface Holiday<T extends Date | string = string> {
    /**
     * Expression of Date string
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
