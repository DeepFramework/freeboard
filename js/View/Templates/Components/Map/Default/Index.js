var defineModule = [
	'openlayer'
];

define(defineModule, function(ol) {
	return {
		name: 'Map-Default',
		exe: function() {
			$(document).ready(function() {
				var map = new ol.Map({
					target: 'map_component',
					layers: [
						new ol.layer.Tile({
							source: new ol.source.MapQuest({layer: 'osm'})
						}),
					],
					view: new ol.View({
						center: [0, 0],
						zoom: 3,
						minZoom: 3,
						maxZoom: 3
					})
				});
			});
		}
	}
});