var defineModule = [
];

define(defineModule, function() {
	var SelectBoxBasic = function() {
        var self = this;
        self.name = 'Filter-SelectBox-Basic';
		self.delegator = null;
        self.obj = null;

        self.componentDisplaySettingData = {
            renderId: '',
            prepareData: {
                selectOptions: []
            }
        };

        self.filterInfo = {
            isRemoteData: false,
            isDataProcessCondition: false,
            conditionName: ''
        };

    	self.outsideDelegator = function(e) {
    		if (self.delegator != undefined) {
	    		var response = {
	    			isRemoteData: self.filterInfo.isRemoteData,
                    isDataProcessCondition: self.filterInfo.isDataProcessCondition,
	    			conditionName: self.filterInfo.conditionName,
	    			value: e.currentTarget.value
	    		}
	    		self.delegator(response);
	    	}
    	}
    	
    	self.setDelegator = function(delegatorObj) {
    		self.delegator = delegatorObj;
    	}

        self.instance = function(data) {
            self.componentDisplaySettingData.renderId = data.componentDisplaySettingData.renderId;
            self.componentDisplaySettingData.prepareData.selectOptions = data.componentDisplaySettingData.prepareData.selectOptions;

            self.filterInfo.isRemoteData = data.filterInfo.isRemoteData;
            self.filterInfo.conditionName = data.filterInfo.conditionName;
            self.filterInfo.isDataProcessCondition = data.filterInfo.isDataProcessCondition != undefined ?
                data.filterInfo.isDataProcessCondition : self.filterInfo.isDataProcessCondition;
        }

        self.interface = {
            update: function(settingData) {
                switch (settingData.process) {
                    case 'val':
                        self.obj.val(settingData.value);
                        break;
                    case 'addOptions':
                        break;
                    case 'disabledOptions':
                        for (var i = 0; i < settingData.value.length; i++) {
                            self.obj.find('[value=' + settingData.value[i].optionValue + ']').prop('disabled', true);
                        }
                        break;
                    case 'enabledOptions':
                        for (var i = 0; i < settingData.value.length; i++) {
                            self.obj.find('[value=' + settingData.value[i].optionValue + ']').prop('disabled', false);
                        }
                        break;
                }
                self.obj.selectpicker('render');
            }
        };

        self.exe = function(data) {
        	self.instance(data);
        	$(document).ready(function() {
                self.obj = $('#M_' +  self.componentDisplaySettingData.renderId + ' .selectpicker');
        		self.obj.selectpicker({
        			width: 'auto'
                });

                self.obj.on('changed.bs.select', function(e) {
                	self.outsideDelegator(e);
                });
        	});
        }
	}

    return {
    	object: SelectBoxBasic
    }
});