module.exports = {
    "context": `${__dirname}/assets`,
    "entry": {
        "main": [
            "./scripts/main.js",
            "./styles/main.scss"
        ]
    },
    "publicPath": "/content/themes/sage",
    "hash": "[name].[hash:8]",
    "watch": [
        "{app,resources/views}/**/*.php"
    ],
    "browsers": [
        "last 2 versions",
        "android 4",
        "opera 12"
    ],
    enabled: {
        sourceMap: true
    },
    copy: "+(images|media)/**/*"
};
