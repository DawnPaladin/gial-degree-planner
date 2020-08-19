planner.controller('IPSSummaryCtrl', ['$scope', 'plan', 'student', '$rootScope', 'Restangular', '_', function($scope, plan, student, $rootScope, Restangular, _) {

  $scope.student = student;
  $scope.planInfo = plan;
  $scope.requiredHoursByCategory = [];

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

  function getCategoryHourTotals() {
    Restangular.one('concentrations', $scope.planInfo.plan.concentration_id).get()
    .then(function(concentrationInfo) {
      var requiredHoursByCategory = _.pluck(concentrationInfo.categories, 'required_units');
      angular.copy(requiredHoursByCategory, $scope.requiredHoursByCategory)
    });
  }

  $scope.totalCoreCredits = countCredits(plan.plan.required_courses);
  $scope.$watch('planInfo.plan.concentration', getCategoryHourTotals)


}]);