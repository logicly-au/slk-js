module.exports = {
  entry: {
    slk: __dirname + "/index.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name]-generator.js",
    library: "SLK"
  },
  resolve: {
    modules: [__dirname + "/node_modules"]
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

