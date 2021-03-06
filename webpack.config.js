const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const Dotenv = require( 'dotenv-webpack' );

module.exports = {
    entry: [ './src/js/app.js' ],
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'js/bundle.js',
    },
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin( {
            filename: 'index.html',
            template: './src/index.html',
        } ),
        new Dotenv(),
    ],
};
