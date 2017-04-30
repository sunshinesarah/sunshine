'use strict';

var sunshineJapanese = angular.module('sunshineJapanese', ['ui.router']);

sunshineJapanese.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    //Home
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })

    //Home - list
        .state('home.list', {
            url: '/list',
            templateUrl: 'home-list.html',
            controller: function($scope) {
                $scope.infos = ['Easy to Pronounce', 'Learn from Scratch', 'New Alphabet'];
            }
        })

    //Home - paragraph
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'You know, I might actually work.'
        })

    //Verbs
        .state('verbs', {
            url: '/verbs',
            views: {
                '': { templateUrl: 'verbs/verbs.html' },
                'columnOne@verbs': { template: 'Look I am a column!' },
                'columnTwo@verbs': {
                    templateUrl: 'verbs/table-data.html',
                    controller: 'fakeTableController'
                }
            }
        })
        .state('particles', {
            url: '/particles',
            views: {
                '': { templateUrl: 'particles/particles.html' },
                'columnOne@particles': { template: 'Explanation' },
                'columnTwo@particles': {
                    templateUrl: 'particles/da/da-data.html',
                    controller: 'ParticlesCtrl'
                }
            }
        });


});

sunshineJapanese.controller('fakeTableController', function($scope) {

    $scope.message = 'Like, I am a messaaaaaaage. ';

    $scope.fakes = [
        {
            name: 'So fake',
            price: 600
        },
        {
            name: 'Totally FAKE data',
            price: 800
        },
        {
            name: 'Pfft I am the fakest',
            price: 1
        }
    ];

});


sunshineJapanese.controller('ParticlesCtrl', function($scope) {
    $scope.examples = [
        {
            nihongo: '家だ',
            kana: 'うち　だ',
            english: 'It is a house.'
        },
        {
            nihongo: 'プログラマーだ',
            kana: 'プログラマーだ',
            english: 'I am a programmer.'
        },
        {
            nihongo: '綺麗だ',
            kana: 'きれい　だ',
            english: 'It is beautiful.'
        }
    ];
});