var defineModule = [
    //'Model/KPIBaseDataModel'
];

define(defineModule, function(KPIBaseDataModel) {
    // Daily Unique User Purchase
    var KPIDUUPISummaryDataModel = Backbone.Model.extend({
        defaults: {
            log_date_daily: "19700101",
            cnt: 0
        }
    });

    var KPIDUUPISummaryDataCollection = Backbone.Collection.extend({
        model: KPIDUUPISummaryDataModel
    });

    return {
        detail: KPIDUUPISummaryDataModel,
        list: KPIDUUPISummaryDataCollection
    }
});