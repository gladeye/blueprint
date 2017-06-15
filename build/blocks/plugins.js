const { config } = require('../utils');
const webpack = require('webpack');

const CleanPlugin = require('clean-webpack-plugin');
const CopyGlobsPlugin = require('copy-globs-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = config(function(instance, options, environment) {

    instance.merge({
        plugins: [
            new CleanPlugin(['dist/**/*'], {
                root: options.paths.context,
                verbose: false
            }),

            new CopyGlobsPlugin({
                pattern: options.copy,
                output: `[path]${environment.valueOf('filename')}.[ext]`,
                manifest: environment.valueOf('manifest'),
            }),

            new WebpackAssetsManifest({
                output: 'assets.json',
                space: 4,
                writeToDisk: false,
                sortManifest: true,
                assets: environment.valueOf('manifest'),
                replacer: require('../../vendor/roots/sage/resources/assets/build/util/assetManifestsFormatter')
            })
        ]
    });

    if(environment.valueOf('production')) {
        const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

        instance.merge({
            plugins: [
                new webpack.optimize.CommonsChunkPlugin({
                    name: '_vendor',
                    minChunks: function(module) {
                        return /node_modules/.test(module.resource);
                    }
                }),

                new webpack.optimize.CommonsChunkPlugin({
                    name: '_manifest'
                }),

                new webpack.optimize.UglifyJsPlugin({
                    sourceMap: options.enabled.sourceMap
                }),

                new OptimizeCssAssetsPlugin({
                    cssProcessor: require('cssnano'),
                    cssProcessorOptions: {
                        discardComments: { removeAll: true }
                    },
                    canPrint: true
                })
            ]
        });
    }

    return instance;
});
