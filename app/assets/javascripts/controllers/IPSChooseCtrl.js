planner.controller('IPSChooseCtrl', ['$scope', '$state', '$rootScope', 'student', 'planService', 'concentrationService', function($scope, $state, $rootScope, student, planService, concentrationService) {
  
  $scope.student = student;
  $scope.planInfo = planService.getPlanInfo();
  $scope.concentration =
    concentrationService
      .getConcentration($scope.planInfo.plan.concentration_id);


  // If the concentration of the plan changes,
  // change the scope variable
  $scope.$watch('planInfo.plan.concentration_id',
    function(newConcentration, prevConcentration, scope) {
      scope.concentration = 
        concentrationService.getConcentration(newConcentration);
  }, true);

  // For all plan updates except for updates to latest_registered and registration_date
  $scope.updatePlan = function(params) {
    planService.update($scope.planInfo.plan);
  };

  // CHECKBOX CALLBACKS:
  // Passed into course-row directives
  $scope.addOrRemoveIntended = function(course) {
    planService.addOrRemoveIntended(course);
  };

  $scope.toggleCompleted = function(course) {
    course.completed = !course.completed;
    course.intended = !course.intended;
    planService.addOrRemoveCompleted(course);
    planService.addOrRemoveIntended(course);
  };

  $scope.logCourse = function(course) {
    console.log('here')
    console.log(course);
  };

}]);