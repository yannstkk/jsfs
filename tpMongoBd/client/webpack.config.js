const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const DIST_FOLDER = path.join('..','public');
const PRODUCTION = false;
const HTML_MAIN_FILE = 'index.html';

module.exports = {
   entry: path.resolve(__dirname, 'main.js'),
      
   output: {
      path: path.resolve(__dirname, DIST_FOLDER),
      filename: 'javascripts/bundle.js'
   },

   mode: (PRODUCTION ? 'production' : 'development'),
   devtool: (PRODUCTION ? undefined : 'eval-source-map'),

   module: {
      rules: [
         {
            test: /\.m?js*/,
            exclude: /(node_modules)/,
            use: {
               loader: 'babel-loader'
            }
         },
         {
            test: /\.css$/,
            use: [
               { loader: 'style-loader' },
               { loader: 'css-loader' }
            ]
         }
    ]
   },

   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, 'index.html'),
         filename: HTML_MAIN_FILE,         
      }),
      
      new CopyPlugin({
         patterns: [
            {
               context: path.resolve(__dirname, 'html'),
               from: '*.html',
               to: '[name].html',
               noErrorOnMissing: true
            },
            {
               context: path.resolve(__dirname, 'style'),
               from: '**/*',
               to: 'stylesheets/[name][ext]',
               noErrorOnMissing: true
            },
            {
               context: path.resolve(__dirname, 'images'),
               from: '**/*',
               to: 'images/[name][ext]',
               noErrorOnMissing: true
            },
         ]
      })
      
   ],

   externals: {
      react: 'React',
      reactdom: 'ReactDom',
   },
};