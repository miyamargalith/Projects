const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
module.exports = {
  context: path.resolve(__dirname, "./client"),
  entry: "index.js",
  output: {
    publicPath: "/"
  },
  resolve: {
    modules: [path.resolve(__dirname, "client"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(css|scss|saas)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { javascriptEnabled: true }
          },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.jpg|\.png|\.gif|\.bmp$|\.svg$|\.webm$|\.mp4$\.ico$/,
        exclude: /fonts/,
        loader: "file-loader"
      },
      {
        test: /\.(woff2?)(\?.*)?$|\.ttf(\?.*)?$|\.eot(\?.*)?$|\.svg(\?.*)?$/,
        exclude: /images/,
        loader: "file-loader",
        options: {
          prefix: "fonts"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html"
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, "client")]
        },
        context: __dirname
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].bundle.css",
      chunkFilename: "css/[id].css"
    }),
    new Dotenv()
  ],
  devtool: "cheap-module-eval-source-map",
  devServer: {
    publicPath: "/",
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: "/index.html" }]
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000/api",
        pathRewrite: { "^/api": "" }
      }
    },
    contentBase: path.join(__dirname, "./public"),
    stats: {
      hash: false,
      version: true,
      timings: true,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: false
    },
    noInfo: false,
    disableHostCheck: true
  }
};
