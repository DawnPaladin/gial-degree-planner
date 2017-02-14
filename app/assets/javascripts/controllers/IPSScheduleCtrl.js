planner.controller('IPSScheduleCtrl', ['$scope', '$rootScope', 'planService', function($scope, $rootScope, planService) {

  $rootScope.$broadcast('toggle-concentration');

  $scope.planInfo = planService.getPlanInfo();

}]);