# Require_All 
 **require_all** is an npm module that does a recursive require/ importing of all the javascript or json files in a folder.
 
 **require_all** does not have any dependency apart from the ones used in development ([mocha]() & [chai]()).
 
## Installation 
To install require_all all you need is the node package manager

        $ npm install require_all

## Usage
**require_all** can be used synchronously and asynchronously. To start using require_all, require it in you script.
 
 ```javascript
    const requireAll = require('require_all')(module);  //pass in the module so it can get the dirname 
  
```

### The requireAll function
This function acts synchronously or asynchronously depending on the parameters passed to it.

require_all acts synchronously if the callback parameter is not passed or the callback === 'sync'.

```javascript
const RequiredObj = requireAll('path/to/file',option)

```
If a callback function is passed or the callback string === 'async' require_all acts asynchronously.
 
A Promise is returned when the callback === "async".
 ```javascript
    requireAll('path/to/file',option,'async')
    .then(requiredObj=> {/*fulfilled*/})
    .catch(err=>{/*error handling*/})
``` 

Or handle with a callback
```javascript
requireAll('path/to/file',option,(err,requiredObj)=>{
	if(err){
		/*error handling*/
	}
	/*run the code*/
})
```


```javascript
const RequiredObj = requireAll('/path/to/file',options,callback)
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
```
From the structure of the way the RequiredObj would look like, to get the the exports of `filename1.js` in a folder
`path/to/js/file/`,

# full documentation coming
