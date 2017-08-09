# Require_All 
 **require_all** is an npm module that does a recursive require/ importing of all the javascript or json files in a folder.
 
 **require_all** does not have any dependency apart from the ones used in development ([mocha]() & [chai]()).
 
## Installation 
To install require_all all you need is the node package manager

        $ npm install require_all

## Usage
**require_all** can be used synchronously and asynchronously. To start using require_all, require it in you script.
 
 ```javascript
    const requireAll = require('require_all');
  
```

### The requireAll function
This function acts synchronously or asynchronously depending on the parameters passed to it.

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
