var planner = angular.module('planner', ['ui.router', 'restangular', 'Devise', 'ngFlash', 'underscore', 'bootstrap3-typeahead', 'xeditable']);

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

planner.run(['$rootScope', 'editableOptions', function($rootScope, editableOptions){
  $rootScope.$on("$stateChangeError", console.warn.bind(console));
  editableOptions.theme = 'bs3';
}]);

planner.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/students');

  $stateProvider

    .state('students', {
      url: '/students',
      templateUrl: '/templates/students.html',
      controller: 'StudentsIndexCtrl'
    })

    .state('meetings', {
      url: '/classes',
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
    .state('ips.studentInfo', {
      url: '/student-info',
      templateUrl: '/templates/ips-student-info.html',
      controller: 'IPSStudentInfoCtrl'
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
    .state('ips.summary', {
      url: '/summary',
      templateUrl: '/templates/ips-summary.html',
      controller: 'IPSSummaryCtrl'
    })

    .state('degrees', {
      url: '/degrees',
      resolve: {
        degrees: ['Restangular',
          function(Restangular) {
            return Restangular.all('degrees').getList();
          }
        ],
      },
      templateUrl: '/templates/degree-index.html',
      controller: 'DegreesIndexCtrl'
    })
    .state('degreeEdit', {
      url: ('/degrees/:degree_id'),
      resolve: {
        degree: ['Restangular', '$stateParams',
          function(Restangular, $stateParams) {
            return Restangular.one('degrees', $stateParams.degree_id).get();
          }
        ],
      },
      templateUrl: '/templates/degree-edit.html',
      controller: 'DegreeEditCtrl'
    });

}]);
