const path = require('path');

module.exports = {
  mode: 'development',
  entry: './lib/holiday_jp.js',
  // 出力の設定
  output: {
    filename: 'holiday_jp_webpacked.js',
    // 出力先のパス（絶対パスを指定する必要がある）
    path: path.join(__dirname, 'scripts')
  }
};
