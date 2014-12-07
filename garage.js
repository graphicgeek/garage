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

		var box = {
			local: localStorage,
			session: sessionStorage
		};

		this.validateStorageMethod = function(method) {
			var validMethods = [
					'local',
					'session'
				],
				valid = false,
				method = method.toLowerCase();

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
				var data = box[newMethod].getItem(this.defaultKey);
				this.data = JSON.parse(data);
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
			console.log(this.data);
			if(this.autoSave){ this.save(); }
			return this;
		};

		this.clear = function(key) {
			this.data[key] = null;
			return this;
		};

		this.clearAll = function(){
			this.data = {};
			this.save();	
			return this;		
		};

		this.save = function() {
			console.log('saving '+ this.storageMethod);
			box[this.storageMethod].setItem(this.defaultKey, JSON.stringify(this.data));
			return this;
		};
		
		var data = box[this.storageMethod].getItem(this.defaultKey);

		if (data) {
			this.data = JSON.parse(data);
		}
	}

	if (!window.garage) {
		window.garage = new Garage();
	}
})();
