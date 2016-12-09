var defineModule = [
    //'Model/KPIBaseDataModel'
];

define(defineModule, function(KPIBaseDataModel) {
    // Daily Excute Gacha Times
    var KPIDEGUSummaryDataModel = Backbone.Model.extend({
    	defaults: {
    		log_date_daily: "19700101",
    		group_id: 0,
    		platform_id: 0,
    		cnt: 0
    	}
    });

    var KPIDEGUSummaryDataCollection = Backbone.Collection.extend({
    	model: KPIDEGUSummaryDataModel
    });

    return {
    	detail: KPIDEGUSummaryDataModel,
    	list: KPIDEGUSummaryDataCollection
    }
});