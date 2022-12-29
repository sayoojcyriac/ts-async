const path = require("path");

const index = "index";

module.exports = {
  entry: `./src/${index}.ts`,
  mode: "development",
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  performance: {
    maxEntrypointSize: 640000,
    maxAssetSize: 640000,
  },

  devServer: {
    static: [path.join(__dirname, "public"), path.join(__dirname, "dist")],
    port: 8080,
  },
};
