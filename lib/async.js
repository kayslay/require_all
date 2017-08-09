/**
 * Created by kayslay on 6/25/17.
 */
const fs = require('fs');
const {basename, extname, join, resolve} = require('path');


/**
 * @description The main export by async.js.
 *
 * This function handles imports asynchronously.
 * It can return a Promise Object or handle a callback depending on if the callback argument passed
 * is a string, or a function.
 *
 * If callback is a string, a Promise is returned. If it is a function, it will handle the function when it ]
 * is done.
 *
 * @param folder
 * @param options
 * @param callback
 * @return {Promise}
 */
module.exports = function (folder, options = {}, callback) {
    const option = configOptions(options);
    let count = 0;
    let Obj = {};
    let __callback;

    return callbackOrPromise(typeof callback);
    /**
     * @description loops through the folder and imports all the js and json files
     * @param {String|String[]} folder
     */
    function transverse(folder) {
        count++;

        fs.readdir(folder, function (err, files) {
            count--;
            if (err) return done(err);

            files.forEach((file) => {
                "use strict";
                if (option.filters.test(file) && !option.exclude.test(file)) {
                    if (!Obj[basename(folder)]) {
                        Obj[basename(folder)] = {};
                    }
                    Obj[basename(folder)][basename(file, '.js')] = require(join(folder, file));
                } else {
                    const isDir = fs.statSync(join(folder, file));
                    if (isDir.isDirectory() && option.depth && !option.excludeDir.test(file)) {
                        transverse(join(folder, file));
                    }
                }
            });
            return done(null)
        })

    }

    /**
     * @description this is called after the whole files has been gotten
     * @param {Error} err
     * @return {*}
     */
    function done(err) {
        if (err) {
            return __callback(err);
        }
        "use strict";
        if (count == 0) {
            return __callback(null, Obj)
        }

    }

    /**
     * @description decides if it should return a Promise or should call folderStringOrArray
     * @param {String} callbackType
     * @return {Promise}
     */
    function callbackOrPromise(callbackType) {
        if (callbackType == 'function') {
            __callback = callback;
            return folderStringOrArray(folder)
        } else {
            return new Promise((resolve, reject) => {
                "use strict";
                __callback = (err, obj) => err ? reject(err) : resolve(obj);
                return folderStringOrArray(folder)
            })
        }
    }

    /**
     * @description how it will call transverse if folder  is either a string or an an Array
     * @param {String|String[]} folder
     */
    function folderStringOrArray(folder) {
        if (typeof folder == "string") {
            transverse(resolve(folder));
        } else {
            folder.forEach(f => transverse(resolve(f)))
        }
    }
};

function configOptions(options) {
    return Object.assign({
        filters: /(\.js|\.json)$/,
        exclude: /^\.\.?$/,
        depth: false,
        excludeDir: /^\.\.$/
    }, options)
}