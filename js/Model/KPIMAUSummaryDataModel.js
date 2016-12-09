var defineModule = [
    //'Model/KPIBaseDataModel'
];

define(defineModule, function(KPIBaseDataModel) {
    var KPIMAUSummaryDataModel = Backbone.Model.extend({
    	defaults: {
    		log_date_monthly: "19700101",
    		group_id: 0,
    		platform_id: 0,
    		mau: 0,
            created_users_amount: 0
    	}
    });

    var KPIMAUSummaryDataCollection = Backbone.Collection.extend({
    	model: KPIMAUSummaryDataModel
    });

    return {
    	detail: KPIMAUSummaryDataModel,
    	list: KPIMAUSummaryDataCollection
    }
});