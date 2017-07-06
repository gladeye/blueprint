const { config } = require("@gladeye/bento");

module.exports = config({
    /**
     * ------------------------------------------------------------------------
     * Paths
     * ------------------------------------------------------------------------
     * "root":      The base directory, an absolute path, that will be used
     *              to resolved all other relative paths in here.
     *
     * "input":     The base directory for webpack to looking for resolving
     *              entry points and loaders from configuration. It's relative
     *              to `paths.root`
     * @see https://webpack.js.org/configuration/entry-context/#context
     *
     * "output":    The output directory on `build` command. It's relative to
     *              `paths.root`
     * @see https://webpack.js.org/configuration/output/#output-path
     *
     * "public":    The public URL of the output directory when referenced
     *              in a browser.
     * @see https://webpack.js.org/configuration/output/#output-publicpath
     *
     */
    "paths": {
        "root": process.cwd(),
        "input": "./public/content/themes/sage/resources/assets/",
        "output": "./public/content/themes/sage/resources/assets/dist/",
        "public": "/content/themes/sage/resources/assets/dist/"
    },

    /**
     * ------------------------------------------------------------------------
     * Entry
     * ------------------------------------------------------------------------
     * "main":      The point or points to enter the application.
     *              Note: vendor static css files can be added here instead of
     *              using standard `import` to improve HMR reload speed.
     * @see https://webpack.js.org/configuration/entry-context/#context
     *
     */
    "entry": {
        "main": [
            // "normalize.css/normalize.css"
            "./scripts/main.js"
        ]
    },

    /**
     * ------------------------------------------------------------------------
     * Resolve
     * ------------------------------------------------------------------------
     * Webpack's `resolve` options can be defined here
     *
     * @see https://webpack.js.org/configuration/resolve/
     *
     * By default "~" is set to resolved to `scripts` folder, make it easier to
     * import modules within there.
     *
     * @see https://webpack.js.org/configuration/resolve/#resolve-alias
     *
     */
    "resolve": {
        alias: {
            "~": "@{paths.resolved.input}/scripts"
        }
    },

    /**
     * ------------------------------------------------------------------------
     * Caching
     * ------------------------------------------------------------------------
     * "hash":      Hash length that will append to output files for
     *              long term caching.
     * @see https://webpack.js.org/guides/caching/#the-problem
     *
     */
    "caching": {
        "hash": ".[hash:8]",
    },

    /**
     * ------------------------------------------------------------------------
     * Additional options
     * ------------------------------------------------------------------------
     * "sourceMap": Enable / disable source map
     *
     */
    "enabled": {
        "sourceMap": true
    },

    /**
     * ------------------------------------------------------------------------
     * Browserslist
     * ------------------------------------------------------------------------
     * "browsers":      Define stack of supported browsers that will use for
     *                  PostCSS `autoprefixer` and `babel-preset-env`
     * @see https://github.com/ai/browserslist#queries
     *
     */
    "browserslist": {
        "browsers": [
            "last 1 version"
        ]
    },

    /**
     * ------------------------------------------------------------------------
     * Babel
     * ------------------------------------------------------------------------
     * `babel-loader` options can be defined here
     *
     * @see https://github.com/babel/babel-loader
     * @see https://github.com/babel/babel-preset-env
     *
     */
    "babel": {
        presets: [
            [
                "env",
                {
                    targets: {
                        browsers: "@{browserslist.browsers}"
                    },
                    loose: true,
                    modules: false,
                    useBuiltIns: true
                }
            ],
            "stage-2"
        ]
    },

    /**
     * ------------------------------------------------------------------------
     * Browsersync
     * ------------------------------------------------------------------------
     * `browsersyncs` options can be defined here, notes that `port` and
     * `proxy` will be ignored
     *
     *
     * @see https://www.browsersync.io/docs/options#option-files
     */
    "browsersync": {
        open: true,
        ghostMode: false,
        watchOptions: {
            ignoreInitial: true,
            ignored: "*.txt",
            cwd: "@{paths.root}"
        },
        files: [

            // "{app,resources/views}/**/*.php"

        ]
    },

    /**
     * ------------------------------------------------------------------------
     * Files
     * ------------------------------------------------------------------------
     * "copy":      Copy files that match the pattern to the output folder.
     *              Note: glob path is relative to `paths.input`
     *
     */
    "files": {
        "copy": "+(images|media)/**/*"
    },


    /**
     * ------------------------------------------------------------------------
     * Back-end Server
     * ------------------------------------------------------------------------
     * "proxy":     Map of endpoints that should be proxied to a back-end
     *              server. Note: currently, only a single value "/" is
     *              supported.
     *
     */
    "server": {
        "proxy": {
            "/": {
                target: "http://localhost:8080",
                changeOrigin: true,
                autoRewrite: true
            }
        }
    }




}, process.argv[1].indexOf('webpack-dev-server') >= 0);

