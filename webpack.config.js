const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
  entry: {
    slk: __dirname + "/index.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
    library: "SLK"
  },
  resolve: {
    modules: [__dirname + "/node_modules"]
  },
  optimization: {
    minimizer: [ new TerserPlugin({}) ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader"
      }
    ]
  },
  watch: true
};

