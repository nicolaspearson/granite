const { WebpackPnpExternals } = require('webpack-pnp-externals');

const webpackConfig = require('granite/webpack-dev.util');

module.exports = function (options, webpack) {
  return webpackConfig(
    {
      ...options,
      bundleFilename: 'dev-server.js',
      cwd: __dirname,
      entry: ['webpack/hot/poll?100', './src/main.ts'],
      externals: [
        WebpackPnpExternals({
          exclude: ['webpack/hot/poll?100'],
        }),
      ],
      plugins: [...options.plugins, new webpack.HotModuleReplacementPlugin()],
    },
    webpack,
  );
};
