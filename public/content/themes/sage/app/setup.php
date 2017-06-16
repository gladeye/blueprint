<?php

namespace App;

use Illuminate\Contracts\Container\Container as ContainerContract;
use Roots\Sage\Assets\JsonManifest;
use Roots\Sage\Config;
use Roots\Sage\Template\Blade;
use Roots\Sage\Template\BladeProvider;

/**
 * Theme assets
 */
add_action('wp_enqueue_scripts', function () {
    $manifest = sage('assets')->manifest;

    // we only need to include `main.js` for dev
    if(!count($manifest)) $manifest['scripts/main.js'] = 'scripts/main.js';

    foreach ($manifest as $key => $value) {
        // ignore anything but scripts/ or styles/
        if(strpos($key, 'scripts/') !== 0 &&
            strpos($key, 'styles/') !== 0) continue;
        // ignore map files
        if(strpos($key, ".map") === strlen($key) - 4) continue;

        if(strpos($key, 'scripts/') !== false) {
            wp_enqueue_script($key, asset_path($key), [], null, true);
        } else {
            wp_enqueue_style($key, asset_path($key), false, null);
        }
    }
}, 100);

/**
 * Theme setup
 */
add_action('after_setup_theme', function () {
    /**
     * Enable HTML5 markup support
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#html5
     */
    add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'search-form']);
}, 20);

/**
 * Updates the `$post` variable on each iteration of the loop.
 * Note: updated value is only available for subsequently loaded views, such as partials
 */
add_action('the_post', function ($post) {
    sage('blade')->share('post', $post);
});

/**
 * Setup Sage options
 */
add_action('after_setup_theme', function () {
    /**
     * Sage config
     */
    $paths = [
        'dir.stylesheet' => get_stylesheet_directory(),
        'dir.template'   => get_template_directory(),
        'dir.upload'     => wp_upload_dir()['basedir'],
        'uri.stylesheet' => get_stylesheet_directory_uri(),
        'uri.template'   => get_template_directory_uri(),
    ];
    $viewPaths = collect(preg_replace('%[\/]?(resources/views)?[\/.]*?$%', '', [STYLESHEETPATH, TEMPLATEPATH]))
        ->flatMap(function ($path) {
            return ["{$path}/resources/views", $path];
        })->unique()->toArray();

        // die(var_dump($viewPaths));
    config([
        'assets.manifest' => "{$paths['dir.stylesheet']}/assets/dist/assets.json",
        'assets.uri'      => "{$paths['uri.stylesheet']}/resources/assets/dist",
        'view.compiled'   => "{$paths['dir.upload']}/cache/compiled",
        'view.namespaces' => ['App' => WP_CONTENT_DIR],
        'view.paths'      => $viewPaths,
    ] + $paths);

    /**
     * Add JsonManifest to Sage container
     */
    sage()->singleton('sage.assets', function () {
        return new JsonManifest(config('assets.manifest'), config('assets.uri'));
    });

    /**
     * Add Blade to Sage container
     */
    sage()->singleton('sage.blade', function (ContainerContract $app) {
        $cachePath = config('view.compiled');
        if (!file_exists($cachePath)) {
            wp_mkdir_p($cachePath);
        }
        (new BladeProvider($app))->register();
        return new Blade($app['view'], $app);
    });

    /**
     * Create @asset() Blade directive
     */
    sage('blade')->compiler()->directive('asset', function ($asset) {
        return "<?= App\\asset_path({$asset}); ?>";
    });
});

/**
 * Init config
 */
sage()->bindIf('config', Config::class, true);
