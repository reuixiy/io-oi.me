const gulp = require("gulp");
const clean = require("gulp-clean");
const shell = require("gulp-shell");
const workbox = require("workbox-build");
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);
const pipeline = require('readable-stream').pipeline;

gulp.task("clean", function () {
    return gulp.src("public", { read: false, allowEmpty: true })
    .pipe(clean());
});

gulp.task("hugo-build", shell.task(["hugo --gc --minify"]));

gulp.task("generate-service-worker", () => {
    return workbox.generateSW({
        cacheId: "hugo-theme-meme",
        swDest: "./public/sw.js",
        clientsClaim: true,
        skipWaiting: true,
        ignoreUrlParametersMatching: [/./],
        offlineGoogleAnalytics: true,
        cleanupOutdatedCaches: true,
        globDirectory: "./public",
        globPatterns: [
            "**/*.{html,css,js,json,woff2}",
        ],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
        modifyUrlPrefix: {
            "": "/"
        },
        runtimeCaching: [
            {
                urlPattern: /\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,
                handler: "cacheFirst",
                options: {
                    cacheName: "image",
                    expiration: {
                        maxEntries: 1000,
                        maxAgeSeconds: 60 * 60 * 24 * 365
                    }
                }
            },
            {
                urlPattern: /\.(?:eot|ttf|woff|woff2)$/,
                handler: "cacheFirst",
                options: {
                    cacheName: "font",
                    expiration: {
                        maxEntries: 1000,
                        maxAgeSeconds: 60 * 60 * 24 * 365
                    }
                }
            },
            {
                urlPattern: new RegExp('^https:\/\/fonts\.googleapis\.com'),
                handler: "staleWhileRevalidate",
                options: {
                    cacheName: "google-fonts-stylesheets"
                }
            },
            {
                urlPattern: new RegExp('^https:\/\/fonts\.gstatic\.com'),
                handler: "cacheFirst",
                options: {
                    cacheName: "google-fonts-webfonts",
                    expiration: {
                        maxEntries: 1000,
                        maxAgeSeconds: 60 * 60 * 24 * 365
                    }
                }
            },
            {
                urlPattern: new RegExp('^https:\/\/cdn\.jsdelivr\.net'),
                handler: "cacheFirst",
                options: {
                    cacheName: "static-libs",
                    expiration: {
                        maxEntries: 1000,
                        maxAgeSeconds: 60 * 60 * 24 * 365
                    }
                }
            }
        ]
    });
});

gulp.task("uglify", function () {
    return pipeline(
        gulp.src("./public/sw.js"),
        uglify(),
        gulp.dest("./public")
  );
});

gulp.task("build", gulp.series("clean", "hugo-build", "generate-service-worker", "uglify"));
