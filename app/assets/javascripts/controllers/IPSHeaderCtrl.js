planner.controller('IPSHeaderCtrl', ['$scope', 'student', 'planService', 'concentrationService',
  function($scope, student, planService, concentrationService) {
  
  $scope.student = student;

  // TODO get from plan instead of student
  $scope.concentrations = student.plan.degree.concentrations;
  $scope.planInfo = planService.getPlanInfo();

  $scope.terms = ['SPRING', 'SUMMER', 'FALL'];

  $scope.updatePlan = function() {
    planService.update($scope.planInfo.plan);
  };

  $scope.$watch('planInfo.plan.concentration_id', function(prevConcentration, newConcentration, scope) {
    scope.concentration =
      concentrationService.getConcentration(newConcentration);
  }, true);


}]);