var defineModule = [
    //'Model/KPIBaseDataModel'
];

define(defineModule, function(KPIBaseDataModel) {
    var KPIDAUSummaryDataModel = Backbone.Model.extend({
    	defaults: {
    		log_date_daily: "19700101",
    		group_id: 0,
    		platform_id: 0,
    		dau: 0,
            created_users_amount: 0,
            comeback_users_amount: 0,
            exist_users_amount: 0
    	}
    });

    var KPIDAUSummaryDataCollection = Backbone.Collection.extend({
    	model: KPIDAUSummaryDataModel
    });

    return {
    	detail: KPIDAUSummaryDataModel,
    	list: KPIDAUSummaryDataCollection
    }
});