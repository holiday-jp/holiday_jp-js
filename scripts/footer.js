
  // AMD / RequireJS
  if (typeof define !== 'undefined' && define.amd) {
    define('holiday_jp', [], function () {
      return holiday_jp;
    });
  }
  // Node.js
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = holiday_jp;
  }
  // included directly via <script> tag
  else {
    root = Function('return this')();
    root.holiday_jp = holiday_jp;
  }
  
})();
