function format(date) {
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + (date.getDate())).slice(-2);
  return (year + '-' + month + '-' + day);
}
module.exports = format;