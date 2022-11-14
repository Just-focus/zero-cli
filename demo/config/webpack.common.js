const paths = require('./paths');

module.exports = {
  // 入口
  entry: {
    index: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.module\.(s[ac]|c)ss$/i, // 匹配所有的 sass/scss/css 文件
        include: paths.appSrc,
        use: [
          // 'style-loader',
          // MiniCssExtractPlugin.loader,
          // 'cache-loader', // 获取前面 loader 转换的结果
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          {
            loader: 'css-loader',
            options: {
              // Enable CSS Modules features
              modules: true,
              importLoaders: 2
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
            }
          },
          // 将 PostCSS 编译成 CSS
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    // postcss-preset-env 包含 autoprefixer
                    'postcss-preset-env'
                  ]
                ]
              }
            }
          },
          // 将 Sass 编译成 CSS
          'sass-loader'
        ]
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        include: paths.appSrc,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/react'],
              plugins: [
                [
                  require('@babel/plugin-proposal-decorators'),
                  { legacy: true }
                ]
              ],
              cacheDirectory: true // 启用缓存
            }
          },
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2015'
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: paths.appSrc,
        type: 'asset/resource'
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/i,
        include: [resolveApp('src')],
        type: 'asset/resource'
      }
    ],
    noParse: /lodash/
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [appSrc, 'node_modules'], // 解析模块时应该搜索的目录, 优先 src 目录下查找需要解析的文件
    alias: {
      '@': appSrc
    }
  },
  cache: {
    type: 'filesystem', // 开启持久化缓存
    version: createEnvironmentHash(env.raw), // 参考react脚手架的配置 可以记录打包缓存的版本
    // cacheDirectory: path.appWebpackCache, // 缓存路径
    store: 'pack',
    // 构建依赖，如果有文件修改，则重新执行打包流程
    buildDependencies: {
      // defaultWebpack: ['webpack/lib/'],
      // config: [__filename],
    }
  }
};
