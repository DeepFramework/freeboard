var defineModule = [
    'highcharts'
];

define(defineModule, function() {
	var getCategories = function(collectionsData) {
        return collectionsData.pluck('log_date');
    }
     
    var getChartData = function(collectionsData) {
    	var dau = collectionsData.pluck('dau');
    	var createdUsersAmount = collectionsData.pluck('created_users_amount');
    	var comebackUsersAmount = collectionsData.pluck('comeback_users_amount');
    	var existUsersAmount = collectionsData.pluck('exist_users_amount');
    	var dauChartData = {
    		name: '全体',
            type: 'line',
    		data: dau,
            color: '#63a69f',
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
    	};

    	var cuaChartData = {
    		name: '新規ユーザ',
            color: '#9ee0d9',
    		data: createdUsersAmount
    	};

    	var cbuaChartData = {
    		name: '復帰ユーザ',
            color: '#FFCC33',
    		data: comebackUsersAmount
    	};

    	var euaChartData = {
    		name: '既存ユーザ',
            color: '#d897d4',
    		data: existUsersAmount
    	};

    	return [
    	    dauChartData,
    	    cuaChartData,
    	    cbuaChartData,
    	    euaChartData
    	];

    }

    var buildData = function(data) {
    	data.xAxis.categories = getCategories(data.model.filteredData);
    	data.chartData = getChartData(data.model.filteredData);
    	return data;
    }

    return {
    	name: 'M_charts_Area_Stacked',
        exe: function(data) {
        	$(document).ready(function() {
        		data = buildData(data);
        		$('#M_charts_Area_Stacked').highcharts({
                    chart: {
                        type: 'area'
                    },
			        title: {
			            text: data.title,//'DAU（全体）',
			            x: -20 //center
			        },
			        subtitle: {
			            text: data.subtitle,//'情報源：spad.akb48game.jp 2016/9/9 ~ 2016/9/13',
			            x: -20
			        },
			        xAxis: {
			            categories: data.xAxis.categories//['9/7', '9/8', '9/9', '9/10', '9/11', '9/12', '9/13']
			        },
			        yAxis: {
			            title: {
			                text: data.yAxis.title//'人数'
			            },
			            plotLines: [{
			                value: 0,
			                width: 1,
			                color: '#808080'
			            }]
			        },
			        tooltip: {
			        	shared: true,
			            valueSuffix: data.tooltip.valueSuffix  //'人'
			        },
                    plotOptions: {
                        area: {
                            stacking: 'normal',
                            //lineColor: '#666666',
                            lineWidth: 0.5,
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                radius: 2,
                                states: {
                                    hover: {
                                        enabled: true
                                    }
                                }
                            }
                        }
                    },
			        legend: {
			            //layout: 'vertical',
			            align: 'center',
			            verticalAlign: 'top',
			            borderWidth: 0,
                        symbolRadius: 2,
                        itemStyle: {
                            'color': '#868686'
                        }
			        },
			        series: data.chartData
			        // [{
			        //     name: '全体',
			        //     data: [31271, 31022, 30030, 30917, 31516, 30148, 29864]
			        // }, {
			        //     name: 'IOS',
			        //     data: [16806, 16569, 16021, 16531, 16778, 16076, 15839]
			        // }, {
			        //     name: 'Android',
			        //     data: [14490, 14468, 14024, 14404, 14766, 14109, 14050]
			        // }]
			    });
        	});
        }
    }
});
