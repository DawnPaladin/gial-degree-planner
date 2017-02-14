planner.controller('IPSHeaderCtrl', ['$scope', 'student', 'planService',
  function($scope, student, planService) {
  
  $scope.student = student;

  // All static information comes over
  // on initial load
  // Student + Degree + List of Concentrations
  $scope.concentrations = student.degree.concentrations;

  $scope.planInfo = planService.getPlanInfo();
  $scope.plan = $scope.planInfo.plan;

  $scope.terms = ['SPRING', 'SUMMER', 'FALL'];

  $scope.updatePlan = function() {
    planService.update($scope.planInfo.plan);
  };

}]);
