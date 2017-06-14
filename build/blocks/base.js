const { config, select } = require('../utils');

module.exports = config(function(instance, options, environemnt) {
    return instance.merge({
        context: options.context,
        entry: options.entry,
        devtool: select({
            'development': 'cheap-module-eval-source-map',
            'production': options.enabled.sourceMap? 'source-map' : undefined
        }),

        output: {
            path: `${options.context}/dist`,
            publicPath: options.publicPath,
            filename: `scripts/${environemnt.valueOf('filename').replace('hash', 'chunkhash')}.js`
        },

        resolve: {
            extensions: [ '*', '.js' ]
        }
    });
});
