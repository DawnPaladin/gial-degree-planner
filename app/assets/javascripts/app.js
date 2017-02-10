var gial = angular.module('gial', ['ui.router', 'restangular', 'Devise']);

gial.config( ['RestangularProvider', function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
  RestangularProvider.setDefaultHttpFields({
      "content-type": "application/json"
  });
}]);

gial.run(['$rootScope', function($rootScope){
  $rootScope.$on("$stateChangeError", console.warn.bind(console));
}]);

gial.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/students');
  $stateProvider
    .state('dashboard', {
      url: '',
      views: {
        'dashboardHeader': {
          templateUrl: '/templates/dashboard-header.html',
          controller: 'DashboardHeaderCtrl',
        },
        'dashboardMain': {
          templateUrl: '/templates/dashboard-main.html',
        }
      }
    })
    .state('dashboard.students', {
      url: '/students',
      views: {
        'dashboardMain@': {
          templateUrl: '/templates/students.html',
          controller: 'StudentsIndexCtrl'
        }
      }
    })
    .state('dashboard.meetings', {
      url: '/classes',
      views: {
        "dashboardMain@": {
          templateUrl: '/templates/meetings.html',
          controller: 'MeetingsIndexCtrl',
        }
      }
    });
}]);
