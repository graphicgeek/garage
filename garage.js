var garage = (function(){

	if(typeof(Storage) == "undefined") {
		console.log('Sorry! No Web Storage support..');
   		return false; 
	} 
	
	var defaultMethod = 'local';

	function isValidMethod(method){
		if(method == 'local' || method == 'session'){
			return true;
		}
		return false;
	}

	function getValidMethod(method){
		method = isValidMethod(method) ? method : defaultMethod;
		return method;
	}

	var box = {
		key: 'parkingGarage',
		local: localStorage.getItem(this.key),//stored until user clears cache
		session: sessionStorage.getItem(this.key),//stored until tab is closed,
		save: function(method){
			var newVal = JSON.stringify(this[getValidMethod(method)]);
			if(method == 'session'){
				sessionStorage.setItem(box.key,  newVal);
			} else {
				localStorage.setItem(box.key,  newVal);
			}
		},//save
		newKey: function(key){
			key = (key) ? key : false;
			if(key){
				this.key = key;//set new key

				//clear existing data
				localStorage.clear();
				sessionStorage.clear();

				//store data in new key
				localStorage.setItem(key, JSON.stringify(this.local));
				sessionStorage.setItem(key, JSON.stringify(this.session));
			}//if
		}//newKey
	};//box

	box.local = (box.local) ? box.local : {};
	box.session = (box.session) ? box.session : {};
	box.local = (box.local instanceof Object) ? box.local : JSON.parse(box.local);
	box.session = (box.session instanceof Object) ? box.session : JSON.parse(box.session);	

	function getVar(key, method){
		return box[getValidMethod(method)][key];
	}

	var garage = {	
		save:function(key, val, method){
			method = getValidMethod(method);
			box[method][key] = val;
			box.save(method);
		},

		get:function(key, defaultVal, method){
			defaultVal = (defaultVal) ? defaultVal : false;

			var val = getVar(key, method);
			val = (val) ? val : defaultVal;
			return val;
		},

		getAll:function(method){
			var retVal = box[getValidMethod(method)];
 			return (retVal instanceof Object) ? retVal : JSON.parse(retVal);
		},

		clear:function(key, method){
			method = getValidMethod(method);
			delete box[method][key];
			box.save(method);
		},

		clearAll:function(method){
			box.local = {};
			box.session = {};
			localStorage.clear();
			sessionStorage.clear();
		},

		setKey: function(key){
			box.newKey(key);
		},

		setDefaultMethod: function(method){
			defaultMethod = getValidMethod(method);
		}
	};

	return garage;

})();