let webpack = require('webpack')
let path = require('path')

module.exports = {

    entry: './src/js/app.js',

    mode: 'development',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist/')
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    optimization: {
        minimize: false,
        nodeEnv: 'development'
    }

}

if (process.env.NODE_ENV === 'production') {
    module.exports.optimization.minimize = true
    module.exports.optimization.nodeEnv = 'production'
}
