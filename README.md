#garage.js#
========

Simple wrapper for using HTML5 local storage

##Features##

* Easily leverage HTML5 local storage
* Store strings or JSON objects
* Store temporarily (until tab is closed) or permanent (until cache is cleared)

##Methods##

###garage.save(key, value, method)###

save a variable

**key: string**

the name of the variable you want to store

**value: string or object**

the variable you want to store

**method: string** (default: 'local')

Type of storage to use, local or session.

See [Storage Methods](https://github.com/graphicgeek/garage/blob/master/README.md#storage-methods)

========

###garage.get(key, method))###

retrieve a variable

**key: string**

the variable you want to retrieve

**method: string** (default: 'local')

Type of storage used when variable was stored, local or session.

========

###garage.getAll(method))###

retrieve an object containing all variables stored with a given storage method

**method: string** (default: 'local')

========

###garage.clear(key, method))###

delete a stored variable

**key: string**

the variable you want to delete

**method: string** (default: 'local')

Type of storage used when variable was stored, local or session.

========

###garage.clearAll())###

Remove all stored variables

========

###garage.setKey(key))###

Garage stores everything in one JSON object under one "key". You would only need to change this if, for some reason, you had another javascript that was also using this key to store and retrieve data from localStorage.

**key: string** (default: 'parkingGarage')

========

###garage.setDefaultMethod(method))###

change the default method of storage

**method: string** (default: 'local')

Can only be set to 'local' or 'session'

####Examples:####
```javascript
//save string
garage.save('fruit', 'orange');

//save an object
var myObject = {
	someProperty: 'someValue'
};
garage.save('myObject', myObject);

//retrieve
garage.get('fruit');
garage.get('myObject');

//delete
garage.clear('fruit');
garage.clear('myObject');
```

========
##Storage Methods##

* set to 'local' to use the localStorage method. Stored value will be saved until deleted, until the user clears their browser's cache
* set to 'session' to use the sessionStorage method. Stored value will be saved until the browser or the tab is closed
* Only 'local' and 'session' will be accepted. If you pass another value, 'local' will be used.