var defineModule = [
    //'Model/KPIBaseDataModel'
];

define(defineModule, function(KPIBaseDataModel) {
    var KPIEventARPUSummaryDataModel = Backbone.Model.extend({
    	defaults: {
            event_id: 0,
    		log_date_event: 'season1',
    		group_id: 0,
    		platform_id: 0,
    		arpu: 0.0,
            start_datetime: '2016-10-01 12:00:00',
            end_datetime: '2016-10-01 12:30:00'
    	}
    });

    var KPIEventARPUSummaryDataCollection = Backbone.Collection.extend({
    	model: KPIEventARPUSummaryDataModel
    });

    return {
    	detail: KPIEventARPUSummaryDataModel,
    	list: KPIEventARPUSummaryDataCollection
    }
});