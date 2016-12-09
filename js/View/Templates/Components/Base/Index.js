var defineModule = [
];

define(defineModule, function() {
	var Base = function() {
		var self = this;
		self.componentName = '';
		self.obj = null;

		self.model = {
            name: null, //one or several
            obj: null,
            conditionRelationship: null,
            data: null,
            filteredData: null // the set of data to query with local condition (collection backbone)
        }

        self.remoteData = {
            url: '',
            requestData: {},
            requestDataKey: '', //key of post data 
            method: '',
            requestDataQueryKey: ''
        }

        self.componentDisplaySettingData = {}

        // Data Part
        self.filter = {
            condition: {
                function_name: '',
                remoteUpdate: false,
                remote: {},
                remoteDataKey: null,
                local: {}
            },
            dataProcess: { //xiang
                function: null,
                condition: {}
            }
            
        }

        self.refreshFlag = false;

        self.isExistAndNoEmptyAttribute = function(attribute) {
            if (attribute != undefined && attribute != null && attribute != {}) {
                return true;
            }
            return false;
        }

        self.filterData = function() {}

        self.loadData = function() {
            if (self.model.conditionRelationship !== undefined) {
                self.model.conditionRelationship.value = 
                    self.filter.condition.remote[self.model.conditionRelationship.filter_name];
            }

            if (self.filter.condition.remoteUpdate) {
                self.remoteData.requestData[self.filter.condition.remoteDataKey] = self.filter.condition.remote;
                // get remote data and update data
                var callback = function(data) {
                    self.model.data = new self.model.obj;
                    self.model.data.set(data);
                    self.filterData();
                }
                var requestData = {};
                requestData[self.remoteData.requestDataKey] = JSON.stringify(self.remoteData.requestData);
                $.ajax({
                    url: self.remoteData.url,
                    type: self.remoteData.method,
                    dataType: 'json',
                    data: requestData,
                    beforeSend: function(xhr) {
                        //xhr.setRequestHeader ('Authorization', BasicAuthorizationCode('s-kou', 'kp6AKTM:A4RkM;Ky^4KY4'));
                    },
                    success: function(data) {
                        callback(data);
                    },
                    complete: function(xhr, ts) {

                    }
                });
            }
            else {
                self.filterData();
            }
        }

        self.instance = function(data) {

        }

        self.interface = {
        	update: function() {},
        }

        self.exe = function(data) {}
	}

	return {
		object: Base
	}
});