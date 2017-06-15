const { config } = require('../utils'),
    respMod = require('resp-modifier'),
    { argv } = require('yargs'),
    webpack = require('webpack'),
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
            new webpack.HotModuleReplacementPlugin()
        ]
    });
});
