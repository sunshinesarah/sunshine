/**
 * Created by sarahwiltshire on 2017/04/27.
 */

'use strict';

angular.module('docs').config(config);

function config($stateProvider, API_DATA, GUIDE_DATA, $urlRouterProvider){
    $urlRouterProvider.otherwise('/guide');
    console.log({$stateProvider: $stateProvider});
    var sidebarTemplate = '' +
      '<h1>Contents</h1>' +
        '<ul class="sidebar-nav">' +
        '<li ng-repeat="page in ctrl.allPages">' +
        '<a ui-sref-active="active" ui-sref="{{page.stateName}}">{{page.name}}</a>' +
        '<ul>' +
            '<li ng-show="ctrl.collapsed(page);" ng-repeat="child in page.docs">' +
        '<a ui-sref-active="active" ui-sref="{{child.name}}">{{child.name}}</a>' + '</li>' +
        '</ul>' +
        '</li>' +
        '</ul>';

    var apiState = {
        name: 'api',
        url: '/api',
        views: {
            'main':{
                templateUrl: 'partials/api.html'
            },
            'sidebar': {
                template: sidebarTemplate,
                controller: 'ApiController as ctrl'
            }
        }
    };

    var guideState = {
        name: 'guide',
        url: '/guide',
        views: {
            'main': {
                templateUrl: 'partials/guide.html'
            },
            'sidebar': {
                template: sidebarTemplate,
                controller: 'GuideController as ctrl'
            }
        }
    };

    $stateProvider.state(apiState);
    $stateProvider.state(guideState);

    angular.forEach(API_DATA, function(parent){
        var newState = {
            name: parent.stateName,
            url: '/' + parent.url,
            views: {
                'main': {
                    templateUrl: parent.outputPath
                },
                'sidebar': {
                    template: sidebarTemplate,
                    controller: 'ApiController as ctrl'
                }
            }
        };
        parent.savedState = newState;

        $stateProvider.state(newState);

        angular.forEach(parent.docs, function(doc){
            var newState = {
                name:doc.stateName,
                url: '/' + doc.url,
                views: {
                    'main': {
                        templateUrl: doc.outputPath
                    },
                    'sidebar': parent.savedState.views.sidebar
                }
            };
            stateProvider.state(newState);
        });
    });

    angular.forEach(GUIDE_DATA, function(parent){
        var newState = {
            name: parent.name,
            url: '/' + parent.url,
            views: {
                'main': {
                    templateUrl: parent.outputPath
                },
                'sidebar': {
                    template: sidebarTemplate,
                    controller: 'GuideController as ctrl'
                }
            }
        };
        $stateProvider.state(newState);

        angular.forEach(parent.docs, function(doc){
            var newState = {
                name: doc.stateName,
                url: '/' + doc.url,
                views: {
                    'main': {
                        templateUrl: doc.outputPath
                    },
                    'sidebar': {
                        template: sidebarTemplate,
                        controller: 'GuideController as ctrl'
                    }
                }
            };
            $stateProvider.state(newState);
        });
    });
}
config.$inject = ["$stateProvider", "API_DATA", "GUIDE_DATA", "$urlRouterProvider"];