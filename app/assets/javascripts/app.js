var planner = angular.module('planner', ['ui.router', 'restangular', 'Devise']);

planner.config(function(AuthProvider) {
  AuthProvider.loginPath('/advisors/sign_in.json');
  AuthProvider.resourceName('advisor');
});

planner.config( ['RestangularProvider', function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
  RestangularProvider.setDefaultHttpFields({
      "content-type": "application/json"
  });
}]);

planner.run(['$rootScope', function($rootScope){
  $rootScope.$on("$stateChangeError", console.warn.bind(console));
}]);

planner.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
    })

    .state('dashboard.advisors', {
      url: '/advisors',
      views: {
        "dashboardMain@": {
          templateUrl: '/templates/advisors.html',
          controller: 'AdvisorsIndexCtrl',
        }
      }
    });
    
}]);
