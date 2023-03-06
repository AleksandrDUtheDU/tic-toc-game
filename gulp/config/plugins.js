// поиск и замена
import replace from "gulp-replace";
// обработка ошибок
import plumber from "gulp-plumber";
// сообщения
import notify from "gulp-notify";
// браузер лайф
import browsersync from "browser-sync";
// проверка обновления 
import newer from "gulp-newer";
// ветвление (dev bild ...)
import ifPlugin from "gulp-if";

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
}