# Blueprint

WordPress project starter kit, based on the excellent [Bedrock](https://roots.io/bedrock/) boilerplate and [Sage](https://roots.io/sage/) theme

**🚨 Currently in real battle testing...**

## Features

- Better Wordpress folder structure
- Manage Wordpress plugins and dependency via [Composer](https://getcomposer.org/)
- Easy WordPress configuration with environment specific files
- Environment variables with [Dotenv](https://github.com/vlucas/phpdotenv)
- Autoloader for mu-plugins (use regular plugins as mu-plugins)
- Sass and ES6 Javascript for front-end development with HMR enabled
- [Webpack](https://webpack.js.org/) for compiling assets
- [Laravel's Blade](https://laravel.com/docs/5.3/blade) as a templating engine


## Requirements

- [WordPress](https://wordpress.org/) >= 4.8
- [PHP](http://php.net/manual/en/install.php) >= 5.6.4
- [Composer](https://getcomposer.org/download/)
- [WP-CLI](http://wp-cli.org/)
- [Node.js](http://nodejs.org/) >= 7
- [Yarn](https://yarnpkg.com/en/docs/install)

## Installation

1. Create a new project in a new folder for your project:

```
    composer create-project gladeye/blueprint your-project-folder-name
```

2. Update environment variables in `.env`  file:
    - `DB_NAME` - Database name
    - `DB_USER` - Database user
    - `DB_PASSWORD` - Database password
    - `DB_HOST` - Database host
    - `WP_ENV` - Set to environment (`development`, `staging`, `production`)
    - `WP_HOME` - Full URL to WordPress home (http://example.com)
    - `WP_SITEURL` - Full URL to WordPress including subdirectory (http://example.com/wp)
    - `AUTH_KEY`, `SECURE_AUTH_KEY`, `LOGGED_IN_KEY`, `NONCE_KEY`, `AUTH_SALT`, `SECURE_AUTH_SALT`, `LOGGED_IN_SALT`, `NONCE_SALT`

If you want to automatically generate the security keys (assuming you have [wp-cli][wp-cli] installed locally) you can use the very handy [wp-cli-dotenv-command][wp-cli-dotenv]:

```
    wp package install aaemnnosttv/wp-cli-dotenv-command

    wp dotenv salts regenerate
```

Or, you can cut and paste from the [Roots WordPress Salt Generator][roots-wp-salt].

3. Run `yarn start` and build something awesome!


[wp-cli]:http://wp-cli.org/
[roots-wp-salt]:https://roots.io/salts.html
[wp-cli-dotenv]:https://github.com/aaemnnosttv/wp-cli-dotenv-command
