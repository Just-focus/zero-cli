// 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development.
// 为模块和 chunk 启用有效的名。

const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { resolveApp } = require('./paths');

module.exports = merge(common, {
  mode: 'development',
  // 输出
  output: {
    filename: '[name].bundle.js',
    path: resolveApp('dist'), // bundle 文件路径
    clean: true // 编译前清除目录
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    // 告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要。
    contentBase: './dist'
  }
});
