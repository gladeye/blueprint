const { config } = require('../utils');

module.exports = config(function(instance, options) {
    return instance.merge({
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                ["env", {
                                    "targets": {
                                        "browsers": options.browsers
                                    },
                                    "loose": true,
                                    "modules": false,
                                    "useBuiltIns": true
                                }],
                                "stage-2"
                            ]
                        }
                    }
                }
            ]
        }
    });
});
