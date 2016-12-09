var defineModule = [
    'View/Templates/Components/Base/Index'
];

define(defineModule, function(Base) {
	var TableBasic = function() {
        Base.object.apply(this);

		var self = this;
		self.componentName = 'Table-Basic';


		self.componentDisplaySettingData = {
			renderId: null,
			columns:[]
		}

		self.data = [];
        self.columns = [];

		self.instance = function(data) {
			self.model.name = data.model.name;
            self.model.obj = data.model.obj;
            self.model.conditionRelationship = self.isExistAndNoEmptyAttribute(data.model.conditionRelationship) ?
                data.model.conditionRelationship : self.model.conditionRelationship;
            self.model.filteredData = data.model.filteredData;
            self.model.data = data.model.data;

            self.remoteData.url = data.remoteData.url;
            self.remoteData.requestData = data.remoteData.requestData;
            self.remoteData.requestDataKey = data.remoteData.requestDataKey;
            self.remoteData.method = data.remoteData.method;

			self.componentDisplaySettingData.renderId = data.componentDisplaySettingData.renderId;
            self.componentDisplaySettingData.columns = data.componentDisplaySettingData.columns;

			self.filter.condition.local = data.filter.condition.local;
            self.filter.condition.remoteDataKey = data.remoteData.remoteDataKey;
            self.filter.condition.remote = self.remoteData.requestData[self.filter.condition.remoteDataKey];
            self.filter.dataProcess.function = self.isExistAndNoEmptyAttribute(data.filter.dataProcess) &&
                self.isExistAndNoEmptyAttribute(data.filter.dataProcess.function) ?
                data.filter.dataProcess.function : self.filter.dataProcess.function; //xiang
            self.filter.dataProcess.condition = self.isExistAndNoEmptyAttribute(data.filter.dataProcess) &&
                self.isExistAndNoEmptyAttribute(data.filter.dataProcess.condition) ?
                data.filter.dataProcess.condition : self.filter.dataProcess.condition; //xiang
		}

		// column example, field value is corresponding to data key
		// [
		// 	{title: "日付", field: "name", formatter: function(val){
        //    return '<font class="log_date">' + val + '</font>';
        //  }},
		// 	{title: "Type", field: "type"},
		// 	{title: "Number", field: "sum"}
		// ]
        self.setColumns = function() {
            self.columns = self.componentDisplaySettingData.columns;
        }

        self.resetColumns = function() {
            self.columns = [];
            self.setColumns();
        }

		// Table data, value key is corresponding to column field
		// [
		//     {"name":"item12","type":"Free","sum":143400},
		//     {"name":"item13","type":"Free","sum":3426919},
		// ]
		self.build = function() {
            self.model.filteredData = self.filter.dataProcess.function != null ?
                self.filter.dataProcess.function(self) : self.model.filteredData; //xiang
            self.setColumns();
			self.setData();
		}

		self.draw = function() {
		    self.obj.datagrid({
		        columns:[self.columns]
		    }).datagrid("loadData", {rows: self.data});
		}

		self.redraw = function() {
			self.resetData();
			self.draw();
		}

        self.setData = function() {
            self.data = self.model.filteredData;
        }

		self.resetData = function() {
			self.data = [];
			self.setData();
		}

        self.filterData = function() {
            self.model.filteredData = self.model.data;
            self.model.filteredData = self.filter.dataProcess.function != null ?
                self.filter.dataProcess.function(self) : self.model.filteredData; //xiang
            if (self.refreshFlag == true) {
                self.redraw();
            }
        }

		self.interface.update = function(queryCondition, redraw) {
            self.filter.condition.remoteUpdate = queryCondition.remoteUpdate;
            self.filter.condition.remote = queryCondition.remote;
            self.filter.condition.local = queryCondition.local;
            self.refreshFlag = redraw;
            self.loadData();
        }

		self.exe = function(data) {
			self.instance(data);
			$(document).ready(function() {
				self.obj = $('#M_' + self.componentDisplaySettingData.renderId + ' #M_Table_Basic table');
                self.build();
				self.draw();
			});
		}
	}

	return {
		object: TableBasic
	}
});