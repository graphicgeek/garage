#garage.js#
========

Simple wrapper for using HTML5 local storage

##Features##

* Easily leverage HTML5 local storage
* Store strings or JSON objects
* Store temporarily (until tab is closed) or permenenty (until cache is cleared)

##Methods##

###garage.save(key, value)###

**key: string**

the name of the variable you want to store

**value: string or object**

the variable you want to store

```javascript
garage.save('fruit', 'orange');

//saving an object
var myObject = {
	someProperty: 'someValue'
};
garage.save('myObject', myObject);
```
