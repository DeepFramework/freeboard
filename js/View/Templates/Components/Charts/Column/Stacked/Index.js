var defineModule = [
    'highcharts'
];

define(defineModule, function() {
    return {
    	name: 'Charts-Column-ColumnStacked',
        exe: function(data) {
        	$(document).ready(function() {
        		$('#M_charts_Column_Stacked').highcharts({
			        chart: {
			            type: 'column'
			        },
			        title: {
			            text: data.title//'DAU（全体）'
			        },
			        subtitle: {
			            text: data.subtitle,//'情報源：spad.akb48game.jp 2016/9/9 ~ 2016/9/13',
			            x: -20
			        },
			        xAxis: {
			            categories: data.xAxis.categories,//['9/7', '9/8', '9/9', '9/10', '9/11', '9/12', '9/13'],
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: data.yAxis.title//'人数'
			            },
			            stackLabels: {
			                enabled: true,
			                style: {
			                    fontWeight: 'bold',
			                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
			                }
			            }
			        },
			        legend: {
			            align: 'right',
			            x: -30,
			            verticalAlign: 'top',
			            y: 25,
			            floating: true,
			            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
			            borderColor: '#CCC',
			            borderWidth: 1,
			            shadow: false
			        },
			        tooltip: {
			            headerFormat: data.tooltip.headerFormat,//'<b>{point.x}</b><br/>',
			            pointFormat: data.tooltip.pointFormat//'{series.name}: {point.y}<br/>全体: {point.stackTotal}'
			        },
			        plotOptions: {
			            column: {
			                stacking: 'normal',
			                dataLabels: {
			                    enabled: true,
			                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
			                    style: {
			                        textShadow: '0 0 3px black'
			                    }
			                }
			            }
			        },
			        series: data.chartData
			        // [{
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