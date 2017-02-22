planner.controller('IPSSummaryCtrl', ['$scope', 'plan', 'student', function($scope, plan, student) {

  $scope.student = student;
  $scope.planInfo = plan;

}]);