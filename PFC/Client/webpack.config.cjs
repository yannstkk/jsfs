const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: {
        'app': './src/js/index.js',      
        'app-ai': './src/js/AiIndex.js'  
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../Server/public')
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/html/about.html', to: 'about.html' },  
                { from: 'src/html/index.html', to: 'index.html' },  
                { from: 'src/css/style.css', to: 'style.css'  },  
                { from: 'src/images', to: 'images' }  
            ]
        }),
        new HtmlPlugin({ template: 'src/html/pfc.html',   filename: 'pfc.html',   chunks: ['app'],    inject: 'body' }),
        new HtmlPlugin({ template: 'src/html/pfcia.html', filename: 'pfcia.html', chunks: ['app-ai'], inject: 'body' })
    ]
};