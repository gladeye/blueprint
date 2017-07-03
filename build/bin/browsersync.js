#!/usr/bin/env node
const bs = require("browser-sync"),
    { argv } = require("yargs"),
    { options } = require("../utils.js");

bs.init({
    open: true,
    ghostMode: false,
    port: argv.port,
    proxy: process.env.WPK_URL,
    watchOptions: {
        ignoreInitial: true,
        ignored: "*.txt",
        cwd: options.paths.theme
    },
    files: options.watch
});
