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
   * Version:0.1
   * Date: 2016.6.18 China
   * Released under the MIT license
*/
var defineModule = [
    'handlebars',
    'nprogress',
    'backstretch',
    'plugins/Helpers/HandlebarsHelper'
];
/**
 */
define(defineModule, function(Handlebars, NProgress) {
    var View = Backbone.View.extend({
        data: {},
        /**
         */
        mainTemplateName: '',
        /**
         */
        mainHtmlHbsHTML: '',
        /**
         */
        actionName: '',
        /**
         */
        subTemplateCount: 0,
        /**
         */
        currentLanguage: 'English',
        instance: function() {
            this.getTemplate();
        },
        /**
         */
        setData: function(value) {
            this.data = value;
        },
        setLanguage: function(language) {
            this.currentLanguage = language;
        },
        setAction: function(action) {
            this.actionName = action;
        },
        setStatueData: function() {
            this.data['status'] = {
                'ST_PAGE': this.actionName
            }
        },
        /**
         */
        getTemplate: function() {
            NProgress.start();
            // The scope is belong to requirejs, so [this] object is window.
            var self = this;
            self.setStatueData();
            var define = this.getTemplateSetting(false);
            if (define) {
                var script = define.pop();
                requirejs(define, function(structure, html, language) {
                    // add language setting of template into Data attribute
                    _.each(language, function(value, key) {
                        self.data[key] = value;
                    });
                    var mainTemplateObj = $(html);
                    $('body').html('');
                    $('body').append(mainTemplateObj);
                    self.subTemplateCount = 0;
                    _.each(structure, function(value, key) {
                        var componentDefineModule = [];
                        var componentJS = '';
                        if (value.html != '' && value.html != undefined) {
                            self.subTemplateCount++;
                            componentDefineModule = self.getTemplateSetting(true, value);
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
                                        var data = {};
                                        if (value.data != undefined && data.model != undefined) {
                                            data = value.data;
                                            data.model.data = self.data[data.model.name];
                                        }
                                        returnJs.exe(data);
                                        self.subTemplateCount--;
                                        self.renderCompleted(script);
                                    });
                                }
                                else {
                                    self.subTemplateCount--;
                                    self.renderCompleted(script);
                                }
                            });
                        }
                    });
                });
            }
        },
        /**
         */
        getTemplateSetting: function(isComponent, subTemplate) {
            var hbsName = subTemplate == undefined ? 'main' : subTemplate.html;
            var templateName_prefix = 'RJ_Text!View/Templates/';
            var templateName_suffix = '.hbs!strip';
            var templateName = '';
            var script = '';

            var templateCssName = '';
            var templateCssName_prefix = 'RJ_Css!View/Templates/';
            var returnValue = [];
            if (isComponent) {
                templateName = templateName_prefix + hbsName + '/Index' +templateName_suffix;
                returnValue.push(templateName);
                if (subTemplate.css != '' && subTemplate.css != undefined) {
                    returnValue.push(templateCssName_prefix + subTemplate.css + '/Index');
                }

                if (subTemplate.js != '' && subTemplate.js != undefined) {
                    returnValue.push('View/Templates/' + subTemplate.js + '/Index');
                }
            }
            else {
                if (this.actionName == "") {
                    console.error("Action name is empty");
                    return false;
                }
                templateName = templateName_prefix + this.actionName + '/' + hbsName + templateName_suffix;
                templateCssName = templateCssName_prefix + this.actionName + '/' + hbsName;
                var structureSetting = 'View/Templates/' + this.actionName + '/' + 'structure_' + hbsName;
                script = 'View/Templates/' + this.actionName + '/' + 'script_' + hbsName;
                var language = 'View/Templates/' + this.actionName + '/' + 'language/' + this.currentLanguage;
                return [
                    structureSetting,
                    templateName,
                    language,
                    templateCssName,
                    script
                ];
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
        renderCompleted: function(script) {
            if (this.subTemplateCount == 0) {
                requirejs([script], function(returnJs) {
                    returnJs.exe();
                    NProgress.done();
                });
            }
        }
    });
    
    var ViewObject = new View;

    return {
        instance: ViewObject
    };
});
