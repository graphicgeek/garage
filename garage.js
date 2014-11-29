/*
For documentation see: https://github.com/graphicgeek/garage
*/
(function(){
	function Garage() {
		if(typeof(Storage) == "undefined") {
			console.log('Garage: localStorage is not supported.');
			return false;
		}

		this.data = {};
		this.storageMethod = 'local';
		this.defaultKey = 'parkingGarage';
		this.autoSave = true;

		this.validateStorageMethod = function(method) {
			var validMethods = [
					'local',
					'session'
				],
				valid = false,
				method = method.toLowerCase;

			for (i = 0; i < validMethods.length; i++) {
				if (method == validMethods[i]) {
					valid = true;
				}
			}

			return valid;
		};

		this.setStorageMethod = function(newMethod) {
			if (this.validateStorageMethod(newMethod)) {
				this.storageMethod = newMethod;
			}
			return this;
		};

		this.get = function(key, defaultVal) {
			defaultVal = (defaultVal) ? defaultVal : false;

			var val = this.data[key];
			val = (val) ? val : defaultVal;
			return val;
		};

		this.set = function(key, value) {
			this.data[key] = value;
			if(this.autoSave){ this.save(); }
			return this;
		};

		this.clear = function(key) {
			this.data[key] = null;
		};

		this.clearAll = function(){
			this.data = {};
			localStorage.clear();
			sessionStorage.clear();			
		};

		this.save = function() {
			if(this.storageMethod == 'local'){
				localStorage.setItem(this.defaultKey, JSON.stringify(this.data));
			}

			if(this.storageMethod == 'session'){
				sessionStorage.setItem(this.defaultKey, JSON.stringify(this.data));
			}
		};
		
		if(this.storageMethod == 'local'){
			var data = localStorage.getItem(this.defaultKey);
		}

		if(this.storageMethod == 'session'){
			var data = sessionStorage.getItem(this.defaultKey);
		}

		if (data) {
			this.data = JSON.parse(data);
		}
	}

	if (!window.garage) {
		window.garage = new Garage();
	}
})();
