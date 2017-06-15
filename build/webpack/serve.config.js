const { config } = require('../utils'),
    { argv } = require('yargs'),
    respMod = require('resp-modifier'),
    webpack = require('webpack'),
    FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'),
    PHP_URL = process.env.PHP_URL;

module.exports = config(function(instance) {
    return instance
    .extend('build/webpack/build.config.js')
    .merge({
        output: {
            pathinfo: true
        },
        devServer: {
            disableHostCheck: true,
            historyApiFallback: true,
            noInfo: true,
            compress: false,
            hot: true,
            inline: true,
            quiet: true,
            overlay: true,
            proxy: {
                '/': {
                    target: PHP_URL,
                    changeOrigin: true,
                    autoRewrite: true
                }
            },
            setup(app) {
                app.use(respMod({
                    rules: [
                        {
                            match: new RegExp(PHP_URL.replace('//', '\/\/'), 'gi'),
                            replace: `http://localhost:${argv.port}`
                        }
                    ]
                }));
            }
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new FriendlyErrorsWebpackPlugin()
        ]
    });
});
