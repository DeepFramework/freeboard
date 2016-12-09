var defineModule = [
    //'Model/KPIBaseDataModel'
];

define(defineModule, function(KPIBaseDataModel) {
    var KPIWAUSummaryDataModel = Backbone.Model.extend({
    	defaults: {
    		log_date_weekly: "19700101",
    		group_id: 0,
    		platform_id: 0,
    		wau: 0,
            created_users_amount: 0
    	}
    });

    var KPIWAUSummaryDataCollection = Backbone.Collection.extend({
    	model: KPIWAUSummaryDataModel
    });

    return {
    	detail: KPIWAUSummaryDataModel,
    	list: KPIWAUSummaryDataCollection
    }
});