var defineModule = [
    'View/Templates/Components/Base/Index',
    'highcharts'
];

define(defineModule, function(Base) {
    var LineAreaStackedChart = function() {
        Base.object.apply(this);

        var self = this;
        self.componentName = 'Charts-Fix-LineAreaStacked';

        self.componentDisplaySettingData = {
            renderId: null,
            title: null,
            subtitle: null,
            xAxis: {
                categories: [],
                categoriesKey: null, //one or several
                crosshair: {
                    dashStyle: 'Solid',
                    color: '#D0D0D0',
                    width: 1
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    },
                    style: {
                        'font-family': 'ヒラギノ角ゴ Pro W3',
                        'font-weight': 400,
                        'font-size': '11px'
                    }
                }
            },
            yAxis: {
                title: null
            },
            tooltip: {
                valueSuffix: '',
                pointFormatter: {
                    y: {
                        decimal: 0,
                        thousandSeparator: ',',
                        decimalSeparator: '.'
                    },
                    x: null
                }
            },
            loading: {
                text: 'Loading...'
            },
            pointers: {}
        }

        self.seriesData = [];

        self.instance = function(data) {
            self.model.name = data.model.name;
            self.model.obj = data.model.obj;
            self.model.conditionRelationship = self.isExistAndNoEmptyAttribute(data.model.conditionRelationship) == true ?
                data.model.conditionRelationship : self.model.conditionRelationship;
            self.model.filteredData = data.model.filteredData;
            self.model.data = data.model.data;

            self.remoteData.url = data.remoteData.url;
            self.remoteData.requestData = data.remoteData.requestData;
            self.remoteData.requestDataKey = data.remoteData.requestDataKey;
            self.remoteData.method = data.remoteData.method;

            self.componentDisplaySettingData.xAxis.categoriesKey = data.componentDisplaySettingData.xAxis.categoriesKey;
            self.componentDisplaySettingData.xAxis.crosshair = data.componentDisplaySettingData.xAxis.crosshair != undefined ?
                data.componentDisplaySettingData.xAxis.crosshair : self.componentDisplaySettingData.xAxis.crosshair;
            self.componentDisplaySettingData.xAxis.labels.formatter = self.isExistAndNoEmptyAttribute(data.componentDisplaySettingData.xAxis.labels) &&
                data.componentDisplaySettingData.xAxis.labels.formatter != undefined ?
                data.componentDisplaySettingData.xAxis.labels.formatter : self.componentDisplaySettingData.xAxis.labels.formatter;
            self.componentDisplaySettingData.renderId = data.componentDisplaySettingData.renderId;
            self.componentDisplaySettingData.title = self.isExistAndNoEmptyAttribute(data.componentDisplaySettingData.title) === true ?
                data.componentDisplaySettingData.title : self.componentDisplaySettingData.title;
            self.componentDisplaySettingData.subtitle = self.isExistAndNoEmptyAttribute(data.componentDisplaySettingData.subtitle) === true ?
                data.componentDisplaySettingData.subtitle : self.componentDisplaySettingData.subtitle;
            self.componentDisplaySettingData.yAxis.title = data.componentDisplaySettingData.yAxis.title;
            self.componentDisplaySettingData.loading.text = self.isExistAndNoEmptyAttribute(data.componentDisplaySettingData.loading) && 
                self.isExistAndNoEmptyAttribute(data.componentDisplaySettingData.loading.text) ?
                data.componentDisplaySettingData.loading.text : self.componentDisplaySettingData.loading.text;
            self.componentDisplaySettingData.pointers = data.componentDisplaySettingData.pointers;
            self.componentDisplaySettingData.tooltip.valueSuffix = self.isExistAndNoEmptyAttribute(data.componentDisplaySettingData.tooltip) &&
                data.componentDisplaySettingData.tooltip.valueSuffix != undefined ?
                data.componentDisplaySettingData.tooltip.valueSuffix : self.componentDisplaySettingData.tooltip.valueSuffix;
             self.componentDisplaySettingData.tooltip.pointFormatter.y = self.isExistAndNoEmptyAttribute(data.componentDisplaySettingData.tooltip) &&
                self.isExistAndNoEmptyAttribute(data.componentDisplaySettingData.tooltip.pointFormatter) &&
                self.isExistAndNoEmptyAttribute(data.componentDisplaySettingData.tooltip.pointFormatter.y) && 
                data.componentDisplaySettingData.tooltip.pointFormatter.y != {} ?
                data.componentDisplaySettingData.tooltip.pointFormatter.y : self.componentDisplaySettingData.tooltip.pointFormatter.y;

            self.filter.condition.local = data.filter.condition.local;
            self.filter.condition.remoteDataKey = data.remoteData.remoteDataKey;
            self.filter.condition.remote = self.remoteData.requestData[self.filter.condition.remoteDataKey];
            self.filter.dataProcess.function = self.isExistAndNoEmptyAttribute(data.filter.dataProcess) &&
                self.isExistAndNoEmptyAttribute(data.filter.dataProcess.function) ?
                data.filter.dataProcess.function : self.filter.dataProcess.function; //xiang
            self.filter.dataProcess.condition = self.isExistAndNoEmptyAttribute(data.filter.dataProcess) &&
                self.isExistAndNoEmptyAttribute(data.filter.dataProcess.condition) ?
                data.filter.dataProcess.condition : self.filter.dataProcess.condition; //xiang
            
        }

        self.setCategories = function() {
            var categoriesKey = self.model.conditionRelationship === null ?
                self.componentDisplaySettingData.xAxis.categoriesKey :
                self.componentDisplaySettingData.xAxis.categoriesKey[self.model.conditionRelationship.value];
            self.componentDisplaySettingData.xAxis.categories = self.model.filteredData.pluck(
                categoriesKey
            );
        }

        self.resetCategories = function() { // Used by chart update
            self.obj.xAxis[0].setCategories(self.componentDisplaySettingData.xAxis.categories);
        }
        
        self.createPointer = function(singlePointSettingData) {
            var seriesPoint = {};
            switch(singlePointSettingData.type) {
                case 'line':
                    seriesPoint = {
                        name: singlePointSettingData.name,
                        type: 'line',
                        data: self.model.filteredData.pluck(singlePointSettingData.dataKey),
                        color: singlePointSettingData.color,
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
                    break;
                default:
                    seriesPoint = {
                        name: singlePointSettingData.name,
                        data: self.model.filteredData.pluck(singlePointSettingData.dataKey),
                        color: singlePointSettingData.color
                    }
                    break;
            }
            return seriesPoint;
        }

        self.setSeriesData = function() {
            self.seriesData = [];
            var pointers = self.model.conditionRelationship === null ?
                self.componentDisplaySettingData.pointers :
                self.componentDisplaySettingData.pointers[self.model.conditionRelationship.value];
            for (var i = 0; i < pointers.length; i++) {
                self.seriesData.push(self.createPointer(pointers[i]));
            }
        }

        self.resetSeriesData = function() { // Used by chart update
            var series = self.obj.series;
            while (series.length > 0) {
                series[0].remove(false);
            }
            self.setSeriesData();
            for (var i = 0; i < self.seriesData.length; i++) {
                self.obj.addSeries(self.seriesData[i]);
            }
        }

        self.buildChartData = function() {
            self.model.filteredData = self.filter.dataProcess.function != null ?
                self.filter.dataProcess.function(self) : self.model.filteredData; //xiang
            self.setCategories();
            self.setSeriesData();
        }

        self.redrawChart = function() {
            self.obj.showLoading(self.componentDisplaySettingData.loading.text);
            self.setCategories();
            self.resetCategories();
            self.resetSeriesData();
            self.obj.redraw(true);
            self.obj.hideLoading();
        }

        self.filterData = function() {
            self.model.filteredData = new self.model.obj;
            self.model.filteredData.add(self.model.data.where(self.filter.condition.local));
            self.model.filteredData = self.filter.dataProcess.function != null ?
            self.filter.dataProcess.function(self) : self.model.filteredData; //xiang
            if (self.refreshFlag == true) {
                self.redrawChart();
            }
        }

        // there is two parts attributes (condition: query condition for new filter data  remoteUpdate: get new data from remote)
        self.interface.update = function(queryCondition, redraw) {
            self.filter.condition.remoteUpdate = queryCondition.remoteUpdate;
            self.filter.condition.remote = queryCondition.remote;
            self.filter.condition.local = queryCondition.local;
            self.refreshFlag = redraw;
            self.loadData();
        }

        self.exe = function(data) {
            self.instance(data);
            self.buildChartData();
            $(document).ready(function() {
                $('#M_' + self.componentDisplaySettingData.renderId).append('<div id="M_charts_Fix_LineAreaStacked"></div>');
                $('#M_' + self.componentDisplaySettingData.renderId + ' #M_charts_Fix_LineAreaStacked').highcharts({
                    chart: {
                        type: 'area'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: self.componentDisplaySettingData.title,
                        x: -20 //center
                    },
                    subtitle: {
                        text: self.componentDisplaySettingData.subtitle,//'情報源：spad.akb48game.jp 2016/9/9 ~ 2016/9/13',
                        x: -20
                    },
                    xAxis: {
                        categories: self.componentDisplaySettingData.xAxis.categories, //['9/7', '9/8', '9/9', '9/10', '9/11', '9/12', '9/13']
                        crosshair: self.componentDisplaySettingData.xAxis.crosshair,
                        labels: self.componentDisplaySettingData.xAxis.labels
                    },
                    yAxis: {
                        title: {
                            text: self.componentDisplaySettingData.yAxis.title  //'人数'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    loading: {
                        hideDuration: 1000,
                        showDuration: 1000
                    },
                    tooltip: {
                        shared: true,
                        //valueSuffix: data.tooltip.valueSuffix,  //'人'
                        pointFormatter: function() {
                            return '<span style="color:' + this.series.color + '">●</span> ' + 
                            this.series.name + ': <b>' + 
                            Highcharts.numberFormat(
                                this.y,
                                self.componentDisplaySettingData.tooltip.pointFormatter.y.decimal,
                                self.componentDisplaySettingData.tooltip.pointFormatter.y.decimalSeparator,
                                self.componentDisplaySettingData.tooltip.pointFormatter.y.thousandSeparator
                            ) + '</b>'　+ self.componentDisplaySettingData.tooltip.valueSuffix +　'<br/>'
                        }
                    },
                    plotOptions: {
                        area: {
                            stacking: 'normal',
                            //lineColor: '#666666',
                            lineWidth: 0.5,
                            marker: {
                                enabled: false,
                                symbol: 'circle',
                                radius: 5,
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
                    series: self.seriesData
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
                self.obj = $('#M_' + self.componentDisplaySettingData.renderId + ' #M_charts_Fix_LineAreaStacked').highcharts();
            });
        }
    }

    return {
        object: LineAreaStackedChart
    }
});
