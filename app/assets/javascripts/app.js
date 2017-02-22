var planner = angular.module('planner', ['ui.router', 'restangular', 'Devise', 'ngFlash', 'underscore', 'bootstrap3-typeahead']);

planner.config(['AuthProvider', function(AuthProvider) {
  AuthProvider.loginPath('/advisors/sign_in.json');
  AuthProvider.resourceName('advisor');
}]);

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

    .state('students', {
      url: '/students',
      resolve: {
        advisors: ['Restangular', function(Restangular) {
          return Restangular.all('advisors').getList();
        }],
        students: ['Restangular', function(Restangular) {
          return Restangular.all('students').getList();
        }]
      },
      templateUrl: '/templates/students.html',
      controller: 'StudentsIndexCtrl'
    })

    .state('meetings', {
      url: '/classes',
      resolve: {
        courses: ['Restangular',
          function(Restangular) {
            return Restangular.all('courses').getList();
          }
        ],
      },
      templateUrl: '/templates/meetings.html',
      controller: 'MeetingsIndexCtrl',
    })

    // Intended Plan of Study
    .state('ips', {
      url: '/IPS/:student_id',
      views: {
        'header': {
          templateUrl: '/templates/ips-header.html',
          controller: 'IPSHeaderCtrl'
        },
        'main': {
          templateUrl: 'templates/ips-main.html'
        }
      },
      resolve: {
        student: ['Restangular', '$stateParams',
          function(Restangular, $stateParams) {
            return Restangular.one('students', $stateParams.student_id).get();
          }],
        plan: ['planService', '$stateParams',
          function(planService, $stateParams) {
            return planService.getPlan($stateParams.student_id);
          }]
      }
    })
    .state('ips.choose', {
      url: '/choose',
      templateUrl: '/templates/ips-choose.html',
      controller: 'IPSChooseCtrl'
    })
    .state('ips.schedule', {
      url: '/schedule',
      templateUrl: '/templates/ips-schedule.html',
      controller: 'IPSScheduleCtrl'
    })
    .state('ips.print', {
      url: '/print',
      templateUrl: '/templates/ips-print.html'
    });

}]);
