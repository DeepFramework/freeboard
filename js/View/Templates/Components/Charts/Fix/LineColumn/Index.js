var defineModule = [
    'highcharts'
];

define(defineModule, function() {
    return {
    	name: 'Charts-Fix-LineColumn',
        exe: function(data) {
        	$(document).ready(function() {
        		$('#M_charts_Fix_Column').highcharts({
			        chart: {
			            zoomType: 'xy'
			        },
			        title: {
			            text: data.title//'DAU（全体）'
			        },
			        subtitle: {
			            text: data.subtitle//'情報源：spad.akb48game.jp  2016/9/9 ~ 2016/9/13'
			        },
			        xAxis: [{
			            categories: data.xAxis.categories,//['9/7', '9/8', '9/9', '9/10', '9/11', '9/12', '9/13'],
			            crosshair: true
			        }],
			        yAxis: [{ // Primary yAxis
			            labels: {
			                format: data.yAxis.first.labelFormat,//'{value}°C',
			                style: {
			                    color: Highcharts.getOptions().colors[1]
			                }
			            },
			            title: {
			                text: data.yAxis.first.titleText,//'Temperature',
			                style: {
			                    color: Highcharts.getOptions().colors[1]
			                }
			            }
			        }, { // Secondary yAxis
			            title: {
			                text: data.yAxis.second.labelText,//'Rainfall',
			                style: {
			                    color: Highcharts.getOptions().colors[0]
			                }
			            },
			            labels: {
			                format: data.yAxis.second.labelFormat,//'{value} mm',
			                style: {
			                    color: Highcharts.getOptions().colors[0]
			                }
			            },
			            opposite: true
			        }],
			        tooltip: {
			            shared: true
			        },
			        legend: {
			            layout: 'vertical',
			            align: 'left',
			            x: 120,
			            verticalAlign: 'top',
			            y: 100,
			            floating: true,
			            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
			        },
			        series: data.chartData
			        // [{
			        //     name: 'DAU（全体）',
			        //     type: 'column',
			        //     yAxis: 1,
			        //     data: [31271, 31022, 30030, 30917, 31516, 30148, 29864],
			        //     tooltip: {
			        //         valueSuffix: '人数'
			        //     }

			        // }, {
			        //     name: 'IOS',
			        //     type: 'spline',
			        //     data: [16806, 16569, 16021, 16531, 16778, 16076, 15839],
			        //     tooltip: {
			        //         valueSuffix: '人数'
			        //     }
			        // }]
			    });
        	});
        }
    }
});