#!/usr/bin/env node
const bs = require('browser-sync'),
    { argv } = require('yargs');

bs.init({
    open: false,
    ghostMode: false,
    port: argv.port,
    proxy: process.env.WPK_URL
});
