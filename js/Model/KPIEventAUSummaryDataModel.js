var defineModule = [
    //'Model/KPIBaseDataModel'
];

define(defineModule, function(KPIBaseDataModel) {
    var KPIEventAUSummaryDataModel = Backbone.Model.extend({
    	defaults: {
            event_id: 0,
    		log_date_event: 'season1',
    		group_id: 0,
    		platform_id: 0,
    		au: 0,
            created_users_amount: 0,
            start_datetime: '2016-10-01 12:00:00',
            end_datetime: '2016-10-01 12:30:00'
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