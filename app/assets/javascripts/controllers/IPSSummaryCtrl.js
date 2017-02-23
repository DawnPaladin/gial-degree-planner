planner.controller('IPSSummaryCtrl', ['$scope', 'plan', 'student', '$rootScope', function($scope, plan, student, $rootScope) {

  $scope.student = student;
  $scope.planInfo = plan;

  $rootScope.$broadcast('onSummary');
  $rootScope.$on('$stateChangeStart', function() {
    $rootScope.$broadcast('offSummary');
  });

  var countCredits = function(courses) {
    var sum = 0;
    courses.forEach(function(course) {
      sum += course.units;
    });
    return sum;
  }

  $scope.totalCoreCredits = countCredits(plan.plan.required_courses);



}]);