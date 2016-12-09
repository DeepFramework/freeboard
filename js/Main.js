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
require.config({
    baseUrl: 'js',
    urlArgs: 'ver=v1',
    paths: {
        'jquery': 'plugins/core/jquery-2.2.3',
        'underscore': 'plugins/core/Underscore',
        'backbone': 'plugins/core/Backbone',
        'handlebars': 'plugins/core/handlebars-v4.0.5',
        'AppRouter': 'Router',
        'Controller': 'Controller',
        'View': 'View',
        'Model': 'Model',
        'RJ_Text': 'plugins/core/text', // RequireJs Text/Html file Plugin
        'RJ_Css': 'plugins/core/css',   // RequireJs Css file Plugin
        'bootstrap': '../bootstrap/js/bootstrap',
        'nprogress': 'plugins/nprogress/nprogress',
        'backstretch': 'plugins/jquery.backstretch.min',
        'lettering': 'plugins/jquery.lettering',
        'textillate': 'plugins/jquery.textillate',
        'jquery-transform': 'plugins/jquery.transform-0.9.1.min',
        'jquery-fancybox': 'plugins/fancybox/jquery.fancybox',
        'jquery-number': 'plugins/jquery.number',
        'jquery-bootstrap': 'plugins/jquery-bootstrap/jquery.bootstrap',
        'css3-animate': 'plugins/css3-animate-it',
        'openlayer': 'http://openlayers.org/en/v3.16.0/build/ol',
        'particlesjs': 'plugins/particles',
        'jquery-metisMenu': 'plugins/metisMenu/metisMenu',
        'daterangepicker': 'plugins/daterangepicker/daterangepicker',
        'highcharts': 'plugins/highcharts/highcharts.src',
        'moment': 'plugins/moment',
        'LoadComponents': 'plugins/LoadComponents',
        'bootstrap-select': 'plugins/bootstrap-select/bootstrap-select',
    },
    shim: {
        'backstretch': ['jquery'],
        'lettering': ['jquery'],
        'textillate': ['jquery'],
        'jquery-number': ['jquery'],
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'bootstrap': {
            deps: [
                'jquery',
                'RJ_Css!../bootstrap/css/bootstrap',
                'bootstrap-select',
                'RJ_Css!./plugins/bootstrap-select/bootstrap-select',
                'jquery-bootstrap',
                'RJ_Css!./plugins/jquery-bootstrap/jquery.bootstrap'
            ],
        },
        'AppRouter': {
            deps: ['backbone'],
            exports: 'AppRouter'
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'nprogress' : {
            deps: [
                'jquery',
                'RJ_Css!./plugins/nprogress/nprogress'
            ],
            exports: 'NProgress',
        },
        'openlayer': {
            deps: [
                'RJ_Css!http://openlayers.org/en/v3.16.0/css/ol.css'
            ]
        },
        'css3-animate': {
            deps: [
                'jquery',
                'RJ_Css!../css/css-animate-it'
            ],
        },
        'textillate': {
            deps: [
                'jquery',
                'lettering',
                'RJ_Css!../css/animate'
            ]
        },
        'jquery-transform': {
            deps: [
                'jquery',
            ],
        },
        'jquery-fancybox': {
            deps: [
                'jquery',
                'RJ_Css!./plugins/fancybox/jquery.fancybox'
            ],
        },
        'jquery-metisMenu': {
            deps: [
                'jquery',
                'RJ_Css!./plugins/metisMenu/metisMenu'
            ]
        },
        'daterangepicker': {
            deps: [
                'bootstrap',
                'RJ_Css!./plugins/daterangepicker/daterangepicker'
            ]
        },
        'View': {
            deps: [
                'handlebars',
                'bootstrap',
                'nprogress',
                'RJ_Css!../fonts/font-awesome/css/font-awesome.css'
            ],
            exports: 'AppView'
        },
        'particlesjs': {
            exports: 'particlesJS'
        },
        'LoadComponents': {
            deps: [
                'handlebars',
                'bootstrap',
                'nprogress',
                'RJ_Css!../fonts/font-awesome/css/font-awesome.css'
            ]
        }
    }
});

require(['AppRouter'], function(AppRouter) {
    var router = AppRouter.instance;

    // Instance the router for backbone
    Backbone.history.start();
});
