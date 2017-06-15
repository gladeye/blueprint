const { Config, environment } = require('webpack-config'),
    path = require('path'),
    context = path.resolve(__dirname, '../public/content/themes/sage/resources/assets/'),
    options = require(`${context}/options.json`);

// inject context
options.context = context;

module.exports.config = function(fn) {
    const config = new Config();
    return fn(config, options, environment);
};

module.exports.select = function(cases) {
    return cases[environment.valueOf('env')];
};
