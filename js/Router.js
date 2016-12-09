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

/**
 */
define(['Controller'], function(Controller) {
    var AppRouter = Backbone.Router.extend({
        pageIndex: '',

        routes: {
            '': 'default',
            '*page/:position': "pages",
            '*page': "pages",
        },
        default: function() {
            this.pageIndex = 'Index';
            this.instance();
        },
        pages: function(page, position) {
            var refreshPage = true;
            this.pageIndex = page.slice(0, 1).toUpperCase() + page.slice(1);
            if (this.checkPage()) {
                if (position != '' && position != undefined) {
                    $('html,body').animate({
                         scrollTop: $('#' + position).offset().top-151
                     }, 1000);
                    refreshPage = false;
                }
            }

            if (refreshPage) {
                this.instance();
            }
        },
        instance: function() {
            var appController = Controller.instance;
            appController.setActionName(this.pageIndex);
            appController.instance();
        },
        checkPage: function() {
            var self = this;
            var isSamePage = false;
            var statusDataDOM = $("input[name^=ST_]");
            _.each(statusDataDOM, function(value, key) {
                if (value.id == 'ST_page') {
                    if (self.pageIndex == value.value) {
                        isSamePage = true;
                    }
                }
            });
            return isSamePage;
        }
    });

    var AppRouterObject = new AppRouter;

    return {
        instance: AppRouterObject
    };
});