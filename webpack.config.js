module.exports = {
  mode: "development",
  target: 'node',
  entry: "./src/main.ts",
  // https://github.com/mapbox/node-sqlite3/issues/1029
  externals: { 'sqlite3': 'commonjs sqlite3'},
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts', '.js',
    ]
  }
};
