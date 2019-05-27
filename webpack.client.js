const path = require("path");

module.exports = {
  target: "node",

  entry: "./src/client/client.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { targets: { browsers: ["last 2 versions"] } }
              ],
              "@babel/preset-react"
            ]
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: ["isomorphic-style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};
