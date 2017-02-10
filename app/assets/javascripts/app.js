var gial = angular.module('gial', ['ui.router', 'restangular', 'Devise']);

gial.config( ['RestangularProvider', function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
  RestangularProvider.setDefaultHttpFields({
      "content-type": "application/json"
  });
}]);

gial.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  // $stateProvider set up states here
}]);

gial.run(['$rootScope', function($rootScope){
  $rootScope.$on("$stateChangeError", console.warn.bind(console));
}]);
