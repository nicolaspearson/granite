const webpack = require('webpack');
const { WebpackPnpExternals } = require('webpack-pnp-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

const webpackConfig = require('granite/webpack.util');

module.exports = (env) => {
  const bundleFilename = env.production ? 'server.js' : 'dev-server.js';
  const entryList = ['./src/main.ts'];
  const plugins = [];
  let webpackPnpExternalsConfig = {};

  if (!env.production) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    entryList.push('webpack/hot/poll?100');
    webpackPnpExternalsConfig = {
      allowlist: ['webpack/hot/poll?100'],
    };
  }

  if (env.run) {
    plugins.push(new RunScriptWebpackPlugin({ name: bundleFilename }));
  }

  return webpackConfig({
    bundleFilename,
    env,
    plugins,
    cwd: __dirname,
    entry: entryList,
    externals: [WebpackPnpExternals(webpackPnpExternalsConfig)],
  });
};
