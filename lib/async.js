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
 * @param callback
 * @return {Promise}
 */
module.exports = function (folder, callback) {
    let count = 0;
    let Obj = {};

    return callbackOrPromise(typeof callback);
    /**
     * @description loops through the folder and imports all the js and json files
     * @param {String|String[]} folder
     * @param {Function|string}callback
     */
    function transverse(folder, callback) {
        count++;

        fs.readdir(folder, function (err, files) {
            count--;
            if (err) return done(err, callback);

            files.forEach((file) => {
                "use strict";
                if (extname(file) == '.js' || extname(file) == '.json') {
                    if (!Obj[basename(folder)]) {
                        Obj[basename(folder)] = {};
                    }
                    Obj[basename(folder)][basename(file, '.js')] = require(join(folder, file));
                }
            });
            return done(null, callback)
        })

    }

    /**
     * @description this is called after the whole files has been gotten
     * @param {Error} err
     * @param {Function} cb
     * @return {*}
     */
    function done(err, cb) {
        if (err) {
            return cb(err);
        }
        "use strict";
        if (count == 0) {
            return cb(null, Obj)
        }

    }

    /**
     * @description decides if it should return a Promise or should call folderStringOrArray
     * @param {String} callbackType
     * @return {Promise}
     */
    function callbackOrPromise(callbackType) {
        if (callbackType == 'function') {
            return folderStringOrArray(folder, callback)
        } else {
            return new Promise((resolve, reject) => {
                "use strict";
                return folderStringOrArray(folder, (err, obj) => err ? reject(err) : resolve(obj)
                )
            })
        }
    }

    /**
     * @description how it will call transverse if folder  is either a string or an an Array
     * @param {String|String[]} folder
     * @param callback
     */
    function folderStringOrArray(folder, callback) {
        if (typeof folder == "string") {
            transverse(resolve(folder), callback);
        } else {
            folder.forEach(f => transverse(resolve(f), callback))
        }
    }
};