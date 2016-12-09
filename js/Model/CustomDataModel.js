var defineModule = [
];

define(defineModule, function(Model) {
    var CustomDataModel = Backbone.Model.extend({
    	defaults: {

    	}
    });

    var CustomDataCollection = Backbone.Collection.extend({
    	model: CustomDataModel
    });

    return {
    	detail: CustomDataModel,
    	list: CustomDataCollection
    }
});