planner.controller('IPSChooseCtrl', ['$scope', '$state', 'student', 'planService', 'concentrationService', function($scope, $state, student, planService, concentrationService) {
  
  $scope.student = student;

  // Add degree requirements to IPS
  $scope.student.degree.required_courses
    .forEach(function(course) {
      course.intended = true;
      planService.addOrRemoveIntended(course);
    });

  $scope.planInfo = planService.getPlanInfo();


  // If the concentration of the plan changes,
  // change the scope variable
  $scope.$watch('planInfo.plan.concentration_id',
    function(newConcentration, prevConcentration, scope) {
      scope.concentration = 
        concentrationService.getConcentration(newConcentration)
  }, true);

  // This is a callback for selecting checkboxes
  // Passed into course-row directives
  $scope.addOrRemoveIntended = function(course) {
    planService.addOrRemoveIntended(course);
  }

  $scope.logCourse = function(course) {
    console.log('here')
    console.log(course);
  };

}]);