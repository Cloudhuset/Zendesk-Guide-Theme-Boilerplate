const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: "script.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: []
};