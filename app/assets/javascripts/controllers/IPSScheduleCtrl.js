planner.controller('IPSScheduleCtrl', ['$scope', '$rootScope', 'planService', function($scope, $rootScope, planService) {

  $rootScope.$broadcast('toggle-concentration');

  $scope.planInfo = planService.getPlanInfo();

  $scope.possibleYears = $scope.planInfo.possibleYears;

  $scope.years = [$scope.possibleYears[0]];

  var nextYear = 1;

  $scope.addYear = function() {
    if ($scope.possibleYears[nextYear]) {
      $scope.years.push($scope.possibleYears[nextYear]);
      nextYear++;
    }
  };


  $scope.handleDrop = function() {
    console.log('dropped');
  };



}]);