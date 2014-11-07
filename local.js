var appLocal = (function(){

	if(typeof(Storage) == "undefined") {
		console.log('Sorry! No Web Storage support..')
   		return false; 
	} 
	
	var garage = window.localStorage;

	var storageKey = 'appLocal';
	var local = garage.getItem(storageKey);
	local = (local) ? local : {};
	local = (local instanceof Object) ? local : JSON.parse(local);

	var appLocal = {	
		save:function(key, val){
			local[key] = val;
			garage.setItem(storageKey,  JSON.stringify(local));
		},

		get:function(key, defaultVal){
			defaultVal = (defaultVal) ? defaultVal : false;
			var val = local[key];
			val = (val) ? val : defaultVal;
			return val;
		},

		getAll:function(){
 			return (local instanceof Object) ? local : JSON.parse(local);
		},

		clear:function(key){
			delete local[key]
			garage.setItem(storageKey, JSON.stringify(local));
		},

		clearAll:function(){
			local = {};
			garage.setItem(storageKey, JSON.stringify(local));
		},
		setKey: function(key){
			key = (key) ? key : false;
			if(key){
				storageKey = key;//set new key
				garage.clear();//clear anything already stored
				garage.setItem(storageKey, JSON.stringify(local));//store data in new key
			}
		}
	};

	return appLocal;

})();