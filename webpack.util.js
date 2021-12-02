const path = require('path');

module.exports = ({ bundleFilename, cwd, entry, externals, plugins, production }) => ({
  externals,
  entry: entry ? entry : ['./src/index.ts'],
  mode: production ? 'production' : 'development', // Sets NODE_ENV
  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.build.json',
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  output: {
    path: path.join(cwd, 'dist'),
    filename: bundleFilename ? bundleFilename : 'index.js',
  },
  plugins,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: 'node',
});
