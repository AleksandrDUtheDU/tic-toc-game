// собирает куски html
import fileinclude from "gulp-file-include";
// прописывает ипрты для картинок + webp
import webpHtmlNosvg from "gulp-webp-html-nosvg";
// проставляет новые версии каждой сборке что препятствует использованию кэша
import versionNumbed from "gulp-version-number";

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fileinclude())
        .pipe(app.plugins.replace(/@img\//g, 'img/')) // замена алиаса
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpHtmlNosvg())
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                versionNumbed({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js',
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'
                    }
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream())
}

// нужна такая настройка Open Settigs (JSON)

// {
//     "path-autocomplete.pathMappings": {
//         "@img": "${folder}/src/img",
//         "@scss": "${folder}/src/scss",
//         "@js": "${folder}/src/js",
//     }
// }