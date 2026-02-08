const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../Server/public')
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/about.html', to: 'about.html' },
        { from: 'src/index.html', to: 'index.html' },
        { from: 'src/style.css', to: 'style.css' }
      ]
    }),
    new HtmlPlugin({
      template: 'src/pfc.html',
      filename: 'pfc.html',
      inject: 'body'
    })
  ],
  watch: true
};