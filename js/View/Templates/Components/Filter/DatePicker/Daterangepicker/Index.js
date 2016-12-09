var defineModule = [
    'moment',
    'daterangepicker'
];

define(defineModule, function(moment) {
    var DateRangePicker = function() {
        var self = this;
        self.name = 'Filter-DatePicker-Daterangpicker';
        self.componentDisplaySettingData = {
            renderId: '',
            locale: {
                monthNames: [],
                daysOfWeek: []
            },
            dateLimit: {
                days: 7
            },
            startDate: null, // data-type: moment object
            endDate: null,   // data-type: moment object
            displayFormat: 'YYYY-MM-DD'
        }
        self.info = {
            isRemoteData: false,
            conditionName: ''
        };
        self.delegator = null;

        self.outsideDelegator = function(response) {
            if (self.delegator != null) {
                self.delegator(response);
            }
        }

        self.setDelegator = function(delegatorObj) {
            self.delegator = delegatorObj;
        }

        self.isExistAndNoEmptyAttribute = function(attribute) {
            if (attribute != undefined && attribute != null && attribute != {}) {
                return true;
            }
            return false;
        }

        self.instance = function(data) {
            self.componentDisplaySettingData.renderId = data.componentDisplaySettingData.renderId;
            self.componentDisplaySettingData.locale.monthNames = self.isExistAndNoEmptyAttribute(data.componentDisplaySettingData.locale) ?
                data.componentDisplaySettingData.locale.monthNames : self.componentDisplaySettingData.locale.monthNames;
            self.componentDisplaySettingData.locale.daysOfWeek = self.isExistAndNoEmptyAttribute(data.componentDisplaySettingData.locale) ?
                data.componentDisplaySettingData.locale.daysOfWeek : self.componentDisplaySettingData.locale.daysOfWeek;
            self.componentDisplaySettingData.dateLimit.days = self.isExistAndNoEmptyAttribute(data.componentDisplaySettingData.dateLimit) ?
                data.componentDisplaySettingData.dateLimit.days : self.componentDisplaySettingData.dateLimit.days;
            self.componentDisplaySettingData.startDate = moment(data.componentDisplaySettingData.startDate);
            self.componentDisplaySettingData.endDate = moment(data.componentDisplaySettingData.endDate);
            self.componentDisplaySettingData.displayFormat = 
                data.componentDisplaySettingData.displayFormat != undefined && data.componentDisplaySettingData.displayFormat != '' ?
                data.componentDisplaySettingData.displayFormat : self.componentDisplaySettingData.displayFormat;

            self.info.isRemoteData = data.info.isRemoteData == undefined ? self.info.isRemoteData : data.info.isRemoteData;
            self.info.conditionName = data.info.conditionName;
        }

        self.update = function(data) {
            self.componentDisplaySettingData.startDate = data.start;
            self.componentDisplaySettingData.endDate = data.end;
            self.cb();
        }

        self.cb = function() {
            $('#M_' + self.componentDisplaySettingData.renderId + ' #M_filter_Datepicker_DaterangerPicker span').html(
                self.componentDisplaySettingData.startDate.format(self.componentDisplaySettingData.displayFormat) +
                ' ~ ' + self.componentDisplaySettingData.endDate.format(self.componentDisplaySettingData.displayFormat)
            );
        }

        self.exe = function(data) {
            self.instance(data);
            $(document).ready(function() {
                $('#M_' + self.componentDisplaySettingData.renderId).append('<div id="M_filter_Datepicker_DaterangerPicker"></div>');
                self.cb();

                $('#M_' + self.componentDisplaySettingData.renderId + ' #M_filter_Datepicker_DaterangerPicker').daterangepicker({
                    "dateLimit": {
                        "days": self.componentDisplaySettingData.dateLimit.days
                    },
                    "ranges": {
                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                        'Last 14 Days': [moment().subtract(13, 'days'), moment()],
                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    },
                    "linkedCalendars": false,
                    "showCustomRangeLabel": false,
                    "alwaysShowCalendars": true,
                    "startDate": self.componentDisplaySettingData.startDate,
                    "endDate": self.componentDisplaySettingData.endDate,
                    "opens": "left",
                    "locale": {
                        "monthNames": self.componentDisplaySettingData.locale.monthNames, //['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        "daysOfWeek": self.componentDisplaySettingData.locale.daysOfWeek //['日', '月', '火', '水', '木', '金','土']
                    },
                    "template": '<div class="daterangepicker dropdown-menu">' +
                        '<div class="calendar left">' +
                            '<div class="calendar-table"></div>' +
                        '</div>' +
                        '<div class="calendar right">' +
                            '<div class="calendar-table"></div>' +
                        '</div>' +
                        '<div class="ranges">' +
                            '<div class="range_inputs">' +
                                '<button class="applyBtn" disabled="disabled" type="button"></button> ' +
                                '<button class="cancelBtn" type="button"></button>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                    
                },
                function(start, end, label) {
                    self.componentDisplaySettingData.startDate = start;
                    self.componentDisplaySettingData.endDate = end;
                    self.cb();
                    self.outsideDelegator({
                        start: start.format('YYYYMMDD'),
                        end: end.format('YYYYMMDD'),
                        isRemoteData: self.info.isRemoteData,
                        conditionName: self.info.conditionName
                    });
                    console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
                });
            });
        }
    }

    return {
        object: DateRangePicker
    }
});