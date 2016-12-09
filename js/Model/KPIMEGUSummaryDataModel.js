var defineModule = [
    //'Model/KPIBaseDataModel'
];

define(defineModule, function(KPIBaseDataModel) {
    // Monthly Excute Gacha Times
    var KPIMEGUSummaryDataModel = Backbone.Model.extend({
    	defaults: {
    		log_date_monthly: "19700101",
    		group_id: 0,
    		platform_id: 0,
    		cnt: 0
    	}
    });

    var KPIMEGUSummaryDataCollection = Backbone.Collection.extend({
    	model: KPIMEGUSummaryDataModel
    });

    return {
    	detail: KPIMEGUSummaryDataModel,
    	list: KPIMEGUSummaryDataCollection
    }
});