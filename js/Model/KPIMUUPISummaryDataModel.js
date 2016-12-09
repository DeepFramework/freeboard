var defineModule = [
    //'Model/KPIBaseDataModel'
];

define(defineModule, function(KPIBaseDataModel) {
    // Monthly Unique User Purchase
    var KPIMUUPISummaryDataModel = Backbone.Model.extend({
    	defaults: {
    		log_date_monthly: "197001",
    		cnt: 0
    	}
    });

    var KPIMUUPISummaryDataCollection = Backbone.Collection.extend({
    	model: KPIMUUPISummaryDataModel
    });

    return {
    	detail: KPIMUUPISummaryDataModel,
    	list: KPIMUUPISummaryDataCollection
    }
});