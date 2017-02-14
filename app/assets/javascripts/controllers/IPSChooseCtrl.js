planner.controller('IPSChooseCtrl', ['$scope', '$state', 'student', 'planService', 'concentrationService', function($scope, $state, student, planService, concentrationService) {
  
  $scope.student = student;

  $scope.planInfo = planService.getPlanInfo();

  $scope.$watch('planInfo.plan.concentration_id', function(newConcentration, prevConcentration, scope) {
    scope.concentration =
      concentrationService.getConcentration(newConcentration);
  }, true);

  $scope.logCourse = function(course) {
    console.log('here')
    console.log(course);
  };

}]);