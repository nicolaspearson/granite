const path = require('path');

module.exports = ({ cwd, env, externals, plugins, entry, bundleFilename }) => ({
  externals,
  plugins,
  entry: entry ? entry : ['./src/index.ts'],
  mode: env.production ? 'production' : 'development',
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
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    minimize: false,
  },
  output: {
    path: path.join(cwd, 'dist'),
    filename: bundleFilename ? bundleFilename : 'index.js',
  },
  target: 'node',
});
