planner.controller('IPSChooseCtrl', ['$scope', '$state', '$rootScope', 'student', 'plan', 'planService', function($scope, $state, $rootScope, student, plan, planService) {

  $rootScope.$broadcast('toggle-concentration', { enabled: true });

  $scope.student = student;
  $scope.planInfo = plan;

  // CHECKBOX CALLBACKS:
  // Passed into course-row directives
  $scope.addOrRemoveIntended = function(course) {
    planService.addOrRemoveIntended(course);
  };

  $scope.toggleCompleted = function(course) {
    course.completed = !course.completed;
    course.intended = !course.intended;
    planService.addOrRemoveCompleted(course);
  };

}]);