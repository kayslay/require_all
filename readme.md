# Require_All 
 **require_all** is an npm module that does a recursive require/ importing of all the javascript or json files in a folder.
 
 **require_all** does not have any dependency apart from the ones used in development ([mocha]() & [chai]()).
 
## Installation 
To install require_all all run

        $ npm install require_all

## Usage
**require_all** can be used synchronously and asynchronously. To start using require_all, require it in you script.
 
 ```javascript
    const requireAll = require('require_all')(module);  //pass in the module so it can get the directory name of the current file
```

### The requireAll function
#### Arguments:
- `path` **{String | Array}**
- `options` **{Object}** optional
- `callback` **{Functon | String}** optional

##### Path
The path to directory or an array of paths to directories to require files from. If the path passed is a relative path, it would be relative from
 the current file's directory.
 
Absolute paths are also supported.

##### Options
The option argument configures certain behaviour of requireAll function. The option is an Object with properties:
- **depth {Boolean}:** Defaults to false. If true it gets the files of sub-directories in the directory of the path.
- **filters {RegExp}:** The default value is `/(\.js|\.json)$/`. Requires the files that match the RegExp.
**Note :** If changed the new RegExp value would replace the default, so if js nad json files want to matched it must 
be included in the new RegExp value.
- **exclude {RegExp}** The files to exclude
- **excludeDir {RegExp}** The directories to exclude

#### Callback

The require_all acts synchronously or asynchronously depending on the parameters passed or not passed as it `callback` parameter.

require_all acts synchronously if the callback parameter is not passed or the callback === `'sync'`.

```javascript
const RequiredObj = requireAll('path/to/file'[,option])
//OR
const RequiredObj = requireAll('path/to/file'[,option],'sync')
```
If a callback function is passed or the callback string === 'async' require_all acts asynchronously.
 
A Promise is returned when the callback === "async".
 ```javascript
    requireAll('path/to/file'[,option],'async')
    .then(requiredObj=> {/*fulfilled*/})
    .catch(err=>{/*error handling*/})
``` 

Or handle with a callback when the function is passed into the `callback` argument

```javascript
requireAll('path/to/file'[,option],(err,requiredObj)=>{
	if(err){
		/*error handling*/
	}
	/*run the code*/
})
```



Depending on the way this function is used, the object gotten after the all the requiring is done is; let say it called
RequiredObj.

RequiredObj would be explained in more details

### RequiredObj
RequiredObj is an object that holds all the functions,array, values e.t.c. of the scripts in the folder required.

#### structure of RequiredObj
```javascript
    RequiredObj = {
    ['folderBaseName']: {
            ['filename1'] : ['exported param'],
            ['filename2'] : ['exported param'] 
        }
    }
    
    // path/to/file
    //file would be the folderBaseName
    //if we have file1.js , file2.js and file3.json
    
    //the value of RequireObj = {'file':{
    //                            file1: [__exported_values__]              
    //                            file2: [__exported_values__]              
    //                            file3: [__exported_values__]              
    //                            }
   
```

## Example Usage 

### Using Require_all Synchronously

```javascript
var requireAll = require("require_all")(module);
//passing an array of paths
const obj = requireAll(['../dummy_module/', '../dummy/'],
	{depth: true, exclude: /((^\.\.)|index.js)/, excludeDir: /^child/});
//passing a single path
const obj = requireAll('../dummy_module/',
	{depth: true, exclude: /((^\.\.)|index.js)/, excludeDir: /^child/});

console.log(obj);
```
### Using Require_all Asynchronously

```javascript
var requireAll = require("require_all")(module);
//using as a promise
 requireAll(['../dummy_module/', '../dummy/'],
	{depth: true, exclude: /((^\.\.)|index.js)/, excludeDir: /^child/},'async')
	.then(obj=> {console.log(obj)})
    .catch(err=>{console.error(err)});
 //using as a callback
 requireAll(['../dummy_module/', '../dummy/'],
 	{depth: true, exclude: /((^\.\.)|index.js)/, excludeDir: /^child/}, (err, obj) => {
 		if (err) {
 			console.error(err)
 		}
 		console.log(obj)
 	})
```

### Please report any issues on the projects issues page [here](https://github.com/kayslay/require_all/issues)

### Badewa Kayode
[@kayslaycode](https://twitter.com/Kayslaycode) [github](https://github.com/kayslay) [Badewa Kayode](https://web.facebook.com/badewa.kayode)