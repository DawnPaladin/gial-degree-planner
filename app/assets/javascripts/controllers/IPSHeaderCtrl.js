planner.controller('IPSHeaderCtrl', ['$scope', 'student', 'planService',
  function($scope, student, planService) {
  
  $scope.student = student;
  $scope.concentrations = student.plan.degree.concentrations;
  $scope.plan = student.plan;
  var _planInfo = planService.getPlanInfo();

  $scope.terms = ['SPRING', 'SUMMER', 'FALL'];

  $scope.possibleYears = _planInfo.possibleYears;

}]);