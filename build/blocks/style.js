const { config } = require('../utils');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = config(function(instance, options, environment) {
    return instance.merge({
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: options.paths.context,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        publicPath: '../',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: options.enabled.sourceMap
                                }
                            },

                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: () => {
                                        return [ require('autoprefixer') ];
                                    },
                                    sourceMap: options.enabled.sourceMap
                                }
                            },
                            {
                                loader: 'resolve-url-loader',
                                options: {
                                    sourceMap: options.enabled.sourceMap
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: options.enabled.sourceMap
                                }
                            }
                        ]
                    })
                }
            ]
        },

        plugins: [
            new ExtractTextPlugin({
                filename: `styles/${environment.valueOf('filename').replace('hash:', 'contenthash:')}.css`,
                disable: !environment.valueOf('production')
            })
        ]
    });
});
