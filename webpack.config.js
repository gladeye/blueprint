const { environment } = require('webpack-config'),
    { config } = require('./build/utils');

module.exports = config(function(instance, options) {
    environment.setAll({
        mode: () => process.env.WEBPACK_MODE || 'build',
        env: () => process.env.NODE_ENV || 'development',
        production: () => process.env.NODE_ENV === 'production',
        filename: (env) => {
            return env.valueOf('mode') === 'build'? options.hash : '[name]';
        },
        manifest: {}
    });

    return instance.extend('./build/webpack/[mode].config.js');
});
