import * as path from 'path';

const config = {
  mode: 'production' as const,
  entry: './lib/holiday_jp.js',
  output: {
    filename: 'holiday_jp.js',
    path: path.join(__dirname, 'release'),
    library: 'holiday_jp',
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  optimization: {
    minimize: false
  }
};

export default config;
