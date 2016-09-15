import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const Config = {
  host: process.env.SERVER_HOST,
  env: process.env.NODE_ENV,
  apiPort: process.env.SERVER_PORT,
  webpackPort: process.env.WEBPACK_PORT,
};

const Dir = {
  src: path.resolve(__dirname, 'client'),
  views: path.resolve(__dirname, 'views'),
  public: path.resolve(__dirname, '..', 'build'),
};

export { Config, Dir };

