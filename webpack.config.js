const path = require('path');

module.exports = {
    entry: './src/index.js',
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "app")
        ],

    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};