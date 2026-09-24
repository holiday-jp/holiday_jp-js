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
  module: {
    rules: [
      {
        // Tree shaking cannot trim a JSON module required from CommonJS (lib/ is tsc output),
        // so keep only the field the bundle reads; otherwise every devDependencies bump changes release/.
        test: path.join(__dirname, 'package.json'),
        type: 'json',
        parser: {
          parse: (source) => ({ version: JSON.parse(source).version }),
        },
      },
    ],
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
