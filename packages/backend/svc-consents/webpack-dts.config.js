const { WebpackPnpExternals } = require('webpack-pnp-externals');

const webpackConfig = require('granite/webpack-dev.util');

module.exports = function (options, webpack) {
  return webpackConfig(
    {
      ...options,
      bundleFilename: 'dev-server.js',
      cwd: __dirname,
      entry: ['./src/swagger/dts-generator.swagger.ts'],
      externals: [WebpackPnpExternals()],
    },
    webpack,
  );
};
