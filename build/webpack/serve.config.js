const { config } = require("../utils");

module.exports = config(function(instance) {
    return instance.extend(
        "build/webpack/build.config.js",
        "build/blocks/dev-server.js"
    );
});
