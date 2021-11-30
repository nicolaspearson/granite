const webpack = require('webpack');
const { WebpackPnpExternals } = require('webpack-pnp-externals');

const webpackConfig = require('granite/webpack.util');

module.exports = (env) => {
  const plugins = [];
  if (!env.production) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  return webpackConfig({
    env,
    plugins,
    cwd: __dirname,
    externals: [WebpackPnpExternals()],
  });
};
