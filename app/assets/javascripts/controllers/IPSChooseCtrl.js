planner.controller('IPSChooseCtrl', ['$scope', '$state', '$rootScope', 'student', 'plan', 'planService', 'concentrationService', '_', function($scope, $state, $rootScope, student, plan, planService, concentrationService, _) {
  
  $scope.student = student;
  $scope.planInfo = plan;
  $scope.courses = $scope.planInfo.plan.coursesById;
  // $scope.concentration =
  //   concentrationService
  //     .getConcentration($scope.planInfo.plan.concentration_id);

  $scope.intendedCourses = $scope.planInfo.plan.intended_courses;
  $scope.requiredCourses = $scope.planInfo.plan.required_courses;
  $scope.completedCourses = $scope.planInfo.plan.completed_courses;
  $scope.coursesByCategory = $scope.planInfo.plan.available_courses;

  // If the concentration of the plan changes,
  // change the scope variable
  $scope.$watch('planInfo.plan.concentration_id',
    function(newConcentration, prevConcentration, scope) {
      scope.concentration = 
        concentrationService.getConcentration(newConcentration);
  }, true);

  // For all plan updates except for updates to latest_registered and registration_date
  $scope.updatePlan = function() {
    planService.update($scope.planInfo.plan);
  };

  // CHECKBOX CALLBACKS:
  // Passed into course-row directives
  $scope.addOrRemoveIntended = function(course) {
    planService.addOrRemoveIntended(course);
  };

  $scope.toggleCompleted = function(course) {
    course.completed = !course.completed;
    console.log('completed', course.completed)
    course.intended = !course.intended;
    console.log('intended', course.intended)
    planService.addOrRemoveCompleted(course);
    // planService.addOrRemoveIntended(course);
  };

  $scope.logCourse = function(course) {
    console.log('here')
    console.log(course);
  };

}]);