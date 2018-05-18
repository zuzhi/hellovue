let webpack = require('webpack')
let path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {

    entry: './src/main.js',

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
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    }
                    // other vue-loader options go here
                }
            }
        ]
    },

    plugins: [
        new VueLoaderPlugin()
    ]

}

if (process.env.NODE_ENV === 'production') {
    module.exports.optimization.minimize = true
    module.exports.optimization.nodeEnv = 'production'
}
