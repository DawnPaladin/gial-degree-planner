planner.controller('IPSChooseCtrl', ['$scope', '$state', '$rootScope', 'student', 'plan', 'planService', function($scope, $state, $rootScope, student, plan, planService) {
  
  $scope.student = student;
  $scope.planInfo = plan;

  // CHECKBOX CALLBACKS:
  // Passed into course-row directives
  $scope.addOrRemoveIntended = function(course) {
    planService.addOrRemoveIntended(course);
    $rootScope.$broadcast('planChanged', course);
  };

  $scope.toggleCompleted = function(course) {
    course.completed = !course.completed;
    course.intended = !course.intended;
    planService.addOrRemoveCompleted(course);
    $rootScope.$broadcast('planChanged', course);
  };

}]);

// Two days,
// 3 unused services,
// and ~10000 LOC later,
// this is what remains.