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
    'View',
    '../languages/Japanese',
    '../languages/Chinese',
    '../languages/English',
];
/**
 */
define(defineModule, function(AppView, L_JP, L_CN, L_EN) {
    var Controller = {
        viewObj: {},
        controllerName: '',
        actionName: 'Index',
        currentLanguage: 'English',
        languageSetup: function() {
            var ls = {
                'ja': L_JP,
                'zh': L_CN,
                'en': L_EN
            };
            var currentLanguage = navigator.language;
            for (var index in ls) {
                if (currentLanguage.indexOf(index) !== -1) {
                    this.viewObj.setData(ls[index]);
                    this.setCurrentLanguage(index);
                    break;
                }
            }
        },
        instance: function() {
            this.setView();
            this.viewObj.setAction(this.actionName);
            this.languageSetup();
            this.viewObj.setLanguage(this.currentLanguage);
            this.viewObj.instance();
        },
        setView: function() {
            this.viewObj = AppView.instance;
        },
        setActionName: function(action) {
            this.actionName = action;
        },
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
        }
    };
    
    var ControllerObject = Controller;

    return {
        instance: ControllerObject
    };
});
