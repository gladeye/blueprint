const { environment } = require('webpack-config'),
    { config } = require('./build/utils'),
    devServer = !!process.argv.indexOf('webpack-dev-server');

module.exports = config(function(instance, options) {
    environment.setAll({
        env: process.env.NODE_ENV || 'development',
        production: process.env.NODE_ENV === 'production',
        filename: (env) => {
            return env.valueOf('mode') === 'build'? options.hash : '[name]';
        },
        manifest: {},
        mode: devServer? 'serve' : 'build'
    });

    return instance.extend('./build/webpack/[mode].config.js');
});
