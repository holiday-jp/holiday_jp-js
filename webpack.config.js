const path = require('path');

const baseConfig = {
  mode: 'production',
  entry: path.join(__dirname, 'lib/holiday_jp.js'),
  output: {
    path: path.join(__dirname, 'release'),
    library: 'holiday_jp',
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
};

module.exports = [{
  ...baseConfig,
  output: {
    ...baseConfig.output,
    filename: 'holiday_jp.js',
  },
  optimization: { minimize: false }
}, {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    filename: 'holiday_jp.min.js',
  },
  optimization: { minimize: true },
  devtool: 'source-map',
}];
