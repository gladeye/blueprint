const { config } = require("../utils");

module.exports = config(function(instance, options, environment) {
    return instance.merge({
        module: {
            rules: [
                {
                    test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg)$/,
                    include: options.paths.context,
                    loader: "file-loader",
                    options: {
                        name: `[path]${environment.valueOf("filename")}.[ext]`
                    }
                },
                {
                    test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg)$/,
                    include: /node_modules/,
                    loader: "file-loader",
                    options: {
                        name: `vendor/${environment.valueOf("filename")}.[ext]`
                    }
                }
            ]
        }
    });
});
