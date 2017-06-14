const { Config, environment } = require('webpack-config'),
    options = require(
        '../public/content/themes/sage/resources/webpack.options.js'
    );

module.exports.config = function(fn) {
    const config = new Config();
    return fn(config, options, environment);
};

module.exports.select = function(cases) {
    return cases[environment.valueOf('env')];
};
