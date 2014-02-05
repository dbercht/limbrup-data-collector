// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers', 'ngResource', 'ngRoute', 'ngCookies'])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // the pet tab has its own child nav-view and history
    .state('tab.intro', {
      url: '/intro',
      views: {
        'intro-tab': {
          templateUrl: 'templates/intro.html',
          controller: 'IntroCtrl'
        }
      }
    })

    // the pet tab has its own child nav-view and history
    .state('tab.start', {
      url: '/start',
      views: {
        'start-tab': {
          templateUrl: 'templates/index.html',
          controller: 'StartCtrl'
        }
      }
    })

    // the pet tab has its own child nav-view and history
    .state('tab.about', {
      url: '/about',
      views: {
        'about-tab': {
          templateUrl: 'templates/create.html',
          controller: 'NewWorkoutCtrl'
        }
      }
    })
    
    // the pet tab has its own child nav-view and history
    .state('tab.workout', {
      url: '/workouts/:id',
      views: {
        'start-tab': {
          templateUrl: 'templates/workout.html',
          controller: 'WorkoutCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/start');

});

