/**
 * Format a date to YYYY-MM-DD string
 * @param date Date object to format
 * @returns Formatted date string (YYYY-MM-DD)
 */
function format(date: Date): string {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + (date.getDate())).slice(-2);
  return (year + '-' + month + '-' + day);
}

export default format;
