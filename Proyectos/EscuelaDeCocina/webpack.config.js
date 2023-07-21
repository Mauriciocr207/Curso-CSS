// MINIFICACION DE CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// Para búsqueda de archivos html
const glob = require('glob');
// CREACION DE INSTANCIAS HTML-WEBPACK-PLUGIN
const rootDir = './src';
const htmlPlugins = glob.sync('**/*.html', {
    cwd: path.resolve(__dirname, rootDir),
}).map( file => {
    return new HtmlWebpackPlugin({
        template: path.resolve(__dirname, rootDir, file),
        scriptLoading: "blocking",
        filename: file,
    })
});

module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: './src/app.js',
    watch: true,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/app.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.resolve(__dirname, 'dist/'),
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: false,
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [require('autoprefixer')],
                            },
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                ],
            },
        ]
    },
    plugins: [
        ...htmlPlugins,
        new MiniCssExtractPlugin({
            filename: './css/app.min.css',
        }),
    ],
    // Dado que estamos utilizando un watch para mirar cambios en los archivos,
    // no es necesario utilizar un server, sin embargo, se puede ejecutar un server
    // de la siguiente forma:
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
        open: true,
        historyApiFallback: {
            rewrites: [
              { from: /^\/$/, to: '/views/index.html' },
              { from: /^\/index\.html/, to: '/views/index.html' },
            ]
          }
    }
    // Y ejecutando en la terminal -> npm run start
}