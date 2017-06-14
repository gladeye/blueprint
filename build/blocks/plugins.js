const { config } = require('../utils');
const webpack = require('webpack');

const CleanPlugin = require('clean-webpack-plugin');
const CopyGlobsPlugin = require('copy-globs-webpack-plugin');


module.exports = config(function(instance, options, environment) {
    instance.merge({
        plugins: [
            new CleanPlugin(['dist/**/*'], {
                root: options.context,
                verbose: false
            }),

            new CopyGlobsPlugin({
                pattern: options.copy,
                output: `[path]${environment.valueOf('filename')}.[ext]`,
                manifest: config.manifest,
            }),
        ]
    });

    if(environment.valueOf('production')) {
        instance.merge({
            plugins: [
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'vendor',
                    minChunks: function(module) {
                        return /node_modules/.test(module.resource);
                    }
                }),

                new webpack.optimize.CommonsChunkPlugin({
                    name: 'manifest'
                })
            ]
        });
    }

    return instance;
});
