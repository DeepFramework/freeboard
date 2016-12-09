var defineModule = [
    //'Model/KPIBaseDataModel'
];

define(defineModule, function(KPIBaseDataModel) {
    // Weekly Excute Gacha Times
    var KPIWEGUSummaryDataModel = Backbone.Model.extend({
    	defaults: {
    		log_date_weekly: "19700101",
    		group_id: 0,
    		platform_id: 0,
    		cnt: 0
    	}
    });

    var KPIWEGUSummaryDataCollection = Backbone.Collection.extend({
    	model: KPIWEGUSummaryDataModel
    });

    return {
    	detail: KPIWEGUSummaryDataModel,
    	list: KPIWEGUSummaryDataCollection
    }
});