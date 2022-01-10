const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist")
  },
  // devtool: "inline-source-map", add this if want to debug
  devServer: {
    static: {
      directory: path.resolve(__dirname, './'),
    }
  }
};