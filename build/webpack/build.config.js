const { config } = require('../utils');

module.exports = config(function(instance) {
    return instance.extend(
        'build/blocks/base.js',
        'build/blocks/script.js',
        'build/blocks/style.js',
        'build/blocks/media.js',
        'build/blocks/plugins.js'
    );
});
