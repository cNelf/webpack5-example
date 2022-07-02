const os = require('os');
const path = require('path');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// cpu核数
const threads = os.cpus().length;

module.exports = {
  entry: './src/main.js',
  output: {
    path: undefined,
    filename: 'static/js/main.js',
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader'],
          },
          {
            test: /\.s[ac]ss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          },
          {
            test: /\.styl$/,
            use: ['style-loader', 'css-loader', 'stylus-loader'],
          },
          {
            test: /\.js$/,
            include: path.resolve(__dirname, '../src'),
            use: [
              {
                loader: 'thread-loader', // 开启多进程
                options: {
                  workers: threads,
                },
              },
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 缓存文件不压缩
                  plugins: ['@babel/plugin-transform-runtime'], // 减小代码体积
                },
              },
            ],
          },
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被处理成base64格式
              },
            },
            generator: {
              filename: 'static/images/[hash:8][ext][query]',
            },
          },
          {
            test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
            type: 'asset/resource',
            generator: {
              filename: 'static/media/[hash:8][ext][query]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules',
      cache: true, // 开启缓存
      cacheLocation: path.resolve(
        __dirname,
        '../node_modules/.cache/.eslint-cache'
      ),
      threads, // 开启多进程
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
  devServer: {
    host: 'localhost',
    port: '3000',
    open: false,
    hot: true,
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
};
