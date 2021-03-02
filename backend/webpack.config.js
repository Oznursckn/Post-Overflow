const path = require("path");
const nodeExternals = require("webpack-node-externals");

const { NODE_ENV = "production" } = process.env;

module.exports = {
  entry: "./src/main.ts",
  mode: NODE_ENV,
  target: "node",
  externalsPresets: { node: true },
  externals: [nodeExternals({ allowlist: ["express", "reflect-metadata"] })],
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
      },
    ],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [],
};
