planner.controller('IPSChooseCtrl', ['$scope', '$state', '$rootScope', 'student', 'plan', 'planService', 'electiveService', function($scope, $state, $rootScope, student, plan, planService, electiveService) {

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

  $scope.deleteElective = function(course) {
    var elective_id = course.elective_id;
    electiveService.remove(elective_id)
      .then(function(elective) {
        if (elective.intended)
          $scope.planInfo.plan.intended_id = elective.course_id;
        if (elective.completed)
          $scope.planInfo.plan.completed_id = elective.course_id;
        planService.update($scope.planInfo.plan, $scope.planInfo.plan.latest_registered);
      });
  }

}]);