/*
For documentation see: https://github.com/graphicgeek/garage
*/
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

	console.log(window.localStorage.getItem('parkingGarage'));
	var box = {
		key: 'parkingGarage',
		save: function(method){
			var newVal = JSON.stringify(this[getValidMethod(method)]);
			console.log(newVal);
			if(method == 'session'){
				sessionStorage.setItem(box.key,  newVal);
				console.log(sessionStorage.getItem(box.key));
			} else {
				localStorage.setItem(box.key,  newVal);
				console.log(localStorage.getItem(box.key));
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
		},//newKey
		init: function(){
			this.local = localStorage.getItem(this.key);//stored until user clears cache
			this.session = sessionStorage.getItem(this.key);//stored until tab is closed
			this.local = (this.local) ? this.local : {};
			this.session = (this.session) ? this.session : {};
			this.local = (this.local instanceof Object) ? this.local : JSON.parse(this.local);
			this.session = (this.session instanceof Object) ? this.session : JSON.parse(this.session);
		}
	};//box

	box.init();

	function getVar(key, method){
		console.log(box);
		console.log(box.local);
		console.log(getValidMethod(method));
		console.log(box[getValidMethod(method)]);
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
			console.log(val);
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