const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // mode: "development",
    entry: {
        'background': "./src/js/background.js",
        'content': "./src/js/content.js",
        'popup': "./src/js/popup.js",
    },
    output: {
        path: path.resolve(__dirname, "lib"),
        filename: "js/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".css"],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/images', to: 'images' },
            { from: 'src/views', to: 'views' },
            { from: 'src/manifest.json' }
        ])
    ]
};