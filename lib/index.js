/**
 * Created by kayslay on 6/25/17.
 */
const asyncFn = require('./async');
const syncFn = require('./sync');

function main() {
    const args = Array.from(arguments);

    if (args.length == 0) {
        throw new Error('no parameter specified')
    }

    if (typeof args[0] !== "string" && !Array.isArray(args[0])) {
        throw new Error('first parameter must be a string or array')
    }

    let folder = args.shift();
    let callback = args.pop();
    let options = args[0];
    let type = 'sync';

    if (typeof callback == 'function' || callback == 'async') {
        type = 'async'
    } else if (typeof callback == 'object'){
        options = callback;
        callback = null
    }

    if (type == 'sync') {
        return syncFn(folder, options)
    }
    return asyncFn(folder, options, callback)
}

module.exports = main;