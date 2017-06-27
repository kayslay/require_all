/**
 * Created by kayslay on 6/25/17.
 */
const fs = require('fs');
const {basename, extname, join, resolve} = require('path');

module.exports = function (folder) {
    let obj = {};
    if (typeof folder == "string") {
        transverse(folder, obj)
    } else {
        folder.forEach(f => transverse(f, obj))
    }
    return obj;
};

function transverse(folder, Obj) {
    let files = fs.readdirSync(folder);
    files.forEach(file => {
        "use strict";
        if (extname(file) == '.js' || extname(file) == '.json') {
            if (!Obj[basename(folder)]) {
                Obj[basename(folder)] = {};
            }
            Obj[basename(folder)][basename(file, '.js')] = require(join(folder, file));
        }
    });
}