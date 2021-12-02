const path = require('path');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

// Options: bundleFilename, cwd, externals, plugins, entry
module.exports = (options, webpack) => {
  const { cwd, bundleFilename, ...rest } = options;
  return {
    ...rest,
    mode: 'development', // Sets NODE_ENV to development
    optimization: {
      minimize: false,
    },
    output: {
      path: path.join(cwd, 'dist'),
      filename: bundleFilename,
    },
    plugins: [
      ...rest.plugins,
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({ name: bundleFilename }),
    ],
    target: 'node',
  };
};
