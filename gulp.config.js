'use strict';

var basePaths = {
    src: 'source',
    dest: 'www',
    bower: 'source/lib',
    e2e: 'e2e'
};

module.exports = {
    applicationName: 'Jarvis',
    env: 'dev', // set the environment to application builds

    /**
     * Application Paths
     */
    basePaths: basePaths,

    paths: {
        scripts: basePaths.src + '/app/**/*.js',
        sass: [basePaths.src + '/assets/sass/**/*.{sass,scss}', basePaths.src + '/app/**/*.{sass,scss}'],
        templates: ["source/**/templates/**/*.{html,jade}", "source/app/menu.{html,jade}"],
        images: "source/assets/images/*",
        fonts: "source/assets/fonts/*.*"
    }
};
