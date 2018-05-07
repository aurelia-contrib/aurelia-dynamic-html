// tslint:disable:no-implicit-dependencies
// tslint:disable:import-name
import { AureliaPlugin, ModuleDependenciesPlugin } from "aurelia-webpack-plugin";
import { readFileSync } from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";

const pkg = JSON.parse(readFileSync("package.json", "utf-8"));

const title = "Aurelia Dynamic HTML Plugin";
interface IEnv {
  server?: boolean;
  production?: boolean;
}

const devBaseUrl: string = "/";
const prodBaseUrl: string = `/${pkg.name}/`;
export default (env: IEnv = {}): webpack.Configuration => {
  const alias = {
    "bluebird": path.resolve(__dirname, "node_modules/bluebird/js/browser/bluebird.core")
  };

  return {
    mode: "development",
    resolve: {
      extensions: [".ts", ".js"],
      modules: [path.resolve(__dirname, "src"), path.resolve(__dirname, "demo"), "node_modules"],
      alias
    },
    entry: {
      app: ["aurelia-bootstrapper"],
      vendor: ["bluebird"]
    },
    output: {
      path: path.resolve(__dirname),
      publicPath: env.production ? prodBaseUrl : devBaseUrl,
      filename: "[name].bundle.js"
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
      historyApiFallback: true,
      lazy: false,
      open: true
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }],
          issuer: [{ not: [{ test: /\.html$/i }] }]
        },
        {
          test: /\.css$/,
          use: [{ loader: "css-loader" }],
          issuer: [{ test: /\.html$/i }]
        },
        {
          test: /\.html$/,
          use: [{ loader: "html-loader" }]
        },
        {
          test: /\.ts$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            configFile: path.resolve(__dirname, "configs/tsconfig-demo.json")
          }
        },
        {
          test: /[\/\\]node_modules[\/\\]bluebird[\/\\].+\.js$/,
          use: [{ loader: "expose-loader?Promise" }]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "demo/index.ejs",
        metadata: {
          title,
          server: env.server,
          baseUrl: env.production ? prodBaseUrl : devBaseUrl
        }
      }),
      new AureliaPlugin(),
      new webpack.ProvidePlugin({
        Promise: "bluebird"
      }),
      new MonacoWebpackPlugin(),
      new webpack.IgnorePlugin(
        /^((fs)|(path)|(os)|(crypto)|(source-map-support))$/,
        /vs(\/|\\)language(\/|\\)typescript(\/|\\)lib/
      )
    ]
  };
};
