const { Config, environment } = require('webpack-config'),
    path = require('path'),
    theme = path.resolve(__dirname, '../public/content/themes/sage'),
    context = `${theme}/resources/assets`,
    options = require(`${context}/options.json`);

// inject paths
options.paths = {
    context, theme
};

module.exports.config = function(fn) {
    const config = new Config();
    return fn(config, options, environment);
};

module.exports.select = function(cases) {
    return cases[environment.valueOf('env')];
};

module.exports.options = options;
