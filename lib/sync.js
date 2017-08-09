/**
 * Created by kayslay on 6/25/17.
 */
const fs = require('fs');
const {basename, extname, join, resolve} = require('path');

module.exports = function (folder, options = {}) {
    let obj = {};
    const option = configOptions(options);
    if (typeof folder == "string") {
        transverse(folder, obj, option)
    } else {
        folder.forEach(f => transverse(f, obj, option))
    }
    return obj;
};

/**
 * @description moves through the folder and gets all the 
 * @param folder
 * @param Obj
 * @param opt
 */
function transverse(folder, Obj, opt) {
    let files = fs.readdirSync(folder);
    files.forEach(file => {
        "use strict";

        if (opt.filters.test(file) && !opt.exclude.test(file)) {
            if (!Obj[basename(folder)]) {
                Obj[basename(folder)] = {};
            }
            Obj[basename(folder)][basename(file, '.js')] = require(join(folder, file));
        } else {
            const isDir = fs.statSync(join(folder, file)).isDirectory();
            if (isDir && opt.depth) {
                transverse(join(folder, file), Obj, opt);
            }
        }


    });
}

function configOptions(options) {
    return Object.assign({
        filters: /(\.js|\.json)$/,
        exclude: /^..?$/,
        depth: false,
    },options)
}