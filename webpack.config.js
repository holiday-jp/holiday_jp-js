import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const config = {
  mode: 'production',
  entry: path.join(__dirname, 'lib/holiday_jp.js'),
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
