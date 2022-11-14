// 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。
// 为模块和 chunk 启用确定性的混淆名称，
// FlagDependencyUsagePlugin，FlagIncludedChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin 和 TerserPlugin 。

const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  // 输出
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: resolveApp('dist'), // bundle 文件路径
    clean: true // 编译前清除目录
  }
});
