/*
    Copyright (c) 2016 freeboard
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

   * freeboard - Free JavaScript MVC Framework
   * Author: Xiang Hou
   * Author URL: http://www.hou-xiang.com
   * Version:0.2
   * Date: 2016.6.18 China
   * Released under the MIT license
*/
var defineModule = [
    'handlebars',
    'nprogress',
    'plugins/Helpers/HandlebarsHelper'
];
/**
 */
define(defineModule, function(Handlebars, NProgress) {
    var LoadComponents = {
        componentInterface: {},
        componentSetting: '',
        templates: {}, //key: target id  value: template setting
        templateCount: 0,
        currentLanguage: 'English',
        actionName: '',
        data: {},
        /**
         */
        reset: function() {
            this.templates = {};
            this.templateCount = 0;
            this.componentInterface = {};
            this.currentLanguage = 'English';
            this.actionName = '';
            this.data = {};
        },
        /**
         */
        addTemplate: function(templateSetting) {
            this.templates[templateSetting.data.componentDisplaySettingData.renderId] = templateSetting;
        },
        /**
         */
        setActionName: function(action) {
            this.actionName = action;
        },
        /**
         */
        languageSetup: function() {
            var ls = {
                'ja': '',
                'zh': '',
                'en': ''
            };
            var currentLanguage = navigator.language;
            currentLanguage = 'ja';
            for (var index in ls) {
                if (currentLanguage.indexOf(index) !== -1) {
                    this.setCurrentLanguage(index);
                    break;
                }
            }
        },
        /**
         */
        setCurrentLanguage: function(languageType) {
            switch(languageType) {
                case 'ja':
                    this.currentLanguage = 'Japanese';
                    break;
                case 'zh':
                    this.currentLanguage = 'Chinese';
                    break;
                case 'en':
                    this.currentLanguage = 'English';
                    break;
                default:
                    this.currentLanguage = 'English';
                    break;
            }
        },
        /**
         */
        exe: function() {
            this.getTemplate();
        },
        /**
         */
        getTemplate: function() {
            var self = this;
            NProgress.start();
            self.languageSetup();
            self.templateCount = 0;
            var language = 'View/Templates/' + self.actionName + '/' + 'language/' + self.currentLanguage;
            requirejs([language], function(language) {
                _.each(language, function(value, key) {
                    self.data[key] = value;
                });
                _.each(self.templates, function(value, key) {
                    var componentDefineModule = [];
                    var componentJS = '';
                    if (value.html != '' && value.html != undefined) {
                        self.templateCount++;
                        componentDefineModule = self.getTemplateSetting(value);
                        componentJS = '';
                        if (value.js != '' && value.js != undefined) {
                            componentJS = componentDefineModule.pop();
                        }
                        requirejs(componentDefineModule, function(componentHtml) {
                            if (self.data[key] != undefined) {
                                var prepareData = value.data != undefined &&
                                    value.data.componentDisplaySettingData != undefined &&
                                    value.data.componentDisplaySettingData.prepareData != undefined ?
                                    value.data.componentDisplaySettingData.prepareData : {};
                                self.data[key].PrepareData = prepareData;
                            }
                            self.render(key, componentHtml);
                            if (componentJS != '') {
                                requirejs([componentJS], function(returnJs) {
                                    returnJs = new returnJs.object();
                                    if (returnJs.setDelegator != undefined && value.delegator != undefined) {
                                        returnJs.setDelegator(value.delegator);
                                    }

                                    var data = {};
                                    if (value.data != undefined && value.data.model != undefined) {
                                        data = value.data;
                                        var callBack = function(data) {
                                            returnJs.exe(data);
                                            if (returnJs.interface != undefined) {
                                                self.componentInterface[key] = returnJs.interface;
                                            }
                                            self.templateCount--;
                                            self.renderCompleted();
                                        }
                                        self.loadModel(data, callBack);
                                    }
                                    else {
                                        data = value.data == undefined ? {} : value.data;
                                        returnJs.exe(data);
                                        if (returnJs.interface != undefined) {
                                            self.componentInterface[key] = returnJs.interface;
                                        }
                                        self.templateCount--;
                                        self.renderCompleted();
                                    }
                                });
                            }
                            else {
                                self.templateCount--;
                                self.renderCompleted();
                            }
                        });
                    }
                });
            });
        },
        /**
         */
        getTemplateSetting: function(template) {
            var hbsName = template.html;
            var templateName_prefix = 'RJ_Text!View/Templates/';
            var templateName_suffix = '.hbs!strip';
            var templateName = '';
            var script = '';

            var templateCssName = '';
            var templateCssName_prefix = 'RJ_Css!View/Templates/';
            var returnValue = [];
            templateName = templateName_prefix + hbsName + '/Index' +templateName_suffix;
            returnValue.push(templateName);
            if (template.css != '' && template.css != undefined) {
                returnValue.push(templateCssName_prefix + template.css + '/Index');
            }

            if (template.js != '' && template.js != undefined) {
                returnValue.push('View/Templates/' + template.js + '/Index');
            }
            return returnValue;
        },
        /**
         */
        render: function(elementId, html) {
            var template = Handlebars.compile($(html)[0].innerHTML);
            $('#M_' + elementId).html(template(this.data[elementId]));
        },
        /**
         */
        renderCompleted: function() {
            if (this.templateCount == 0) {
                NProgress.done();
            }
        },
        /**
         */
        loadModel: function(templateDataSetting, callBack) {
            var BasicAuthorizationCode = function(username, password) {
                var safeStr = unescape(encodeURIComponent(username + ':' + password));
                var btoaCode = btoa(safeStr);
                return 'Basic ' + btoaCode;
            };
            var requireModel = templateDataSetting.model.conditionRelationship != undefined ?
                templateDataSetting.model.name[templateDataSetting.model.conditionRelationship.value] :
                templateDataSetting.model.name;
            requirejs([requireModel], function(model) {
                var dataModel = templateDataSetting.model.isList == true ? model.list : model.detail;
                var requestData = {};
                requestData[templateDataSetting.remoteData.requestDataKey] = JSON.stringify(templateDataSetting.remoteData.requestData);

                $.ajax({
                    url: templateDataSetting.remoteData.url,
                    type: templateDataSetting.remoteData.method,
                    dataType: 'json',
                    data: requestData,
                    beforeSend: function(xhr) {
                        //xhr.setRequestHeader ('Authorization', BasicAuthorizationCode('s-kou', 'kp6AKTM:A4RkM;Ky^4KY4'));
                    },
                    success: function(data) {
                        var fullData = new dataModel;
                        if (templateDataSetting.model.isList) {
                            fullData.add(data);
                        }
                        else {
                            fullData.set(data);
                        }
                        templateDataSetting.model.data = fullData;
                        templateDataSetting.model.obj = dataModel;
                        var filterData = fullData;
                        if (
                            templateDataSetting.model.isList &&
                            templateDataSetting.filter.condition != undefined &&
                            templateDataSetting.filter.condition.local != undefined &&
                            templateDataSetting.filter.condition.local != {}
                        ) {
                            filterData = new dataModel;
                            filterData.add(fullData.where(templateDataSetting.filter.condition.local));
                        }
                        templateDataSetting.model.filteredData = filterData;
                        callBack(templateDataSetting);
                    },
                    complete: function(xhr, ts) {

                    }
                });
            });
        }
    };

    var LCF = LoadComponents;

    return {
        instance: LCF
    };
});



