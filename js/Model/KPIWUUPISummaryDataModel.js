var defineModule = [
    //'Model/KPIBaseDataModel'
];

define(defineModule, function(KPIBaseDataModel) {
    // Weekly Unique User Purchase
    var KPIWUUPISummaryDataModel = Backbone.Model.extend({
    	defaults: {
    		log_date_weekly: "19700101-19700107",
    		cnt: 0
    	}
    });

    var KPIWUUPISummaryDataCollection = Backbone.Collection.extend({
    	model: KPIWUUPISummaryDataModel
    });

    return {
    	detail: KPIWUUPISummaryDataModel,
    	list: KPIWUUPISummaryDataCollection
    }
});