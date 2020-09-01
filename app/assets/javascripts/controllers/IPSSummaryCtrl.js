planner.controller('IPSSummaryCtrl', ['$scope', 'plan', 'student', '$rootScope', 'Restangular', '_', function($scope, plan, student, $rootScope, Restangular, _) {

  $scope.student = student;
  $scope.planInfo = plan;
  $scope.requiredHoursByCategory = [];
  $scope.concentrationSpecificCourses = [];

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

  function getConcentrationSpecificCourses() {
    Restangular.one('concentrations', $scope.planInfo.plan.concentration_id).get()
    .then(function(concentrationInfo) {
      var category = concentrationInfo.categories.find(function(category) {
        return category.name == "Concentration-specific courses";
      });
      if (category) angular.copy(category.courses, $scope.concentrationSpecificCourses);
    });
  }

  // The "Arts & Scripture Engagement" concentration needs to show the courses available in the category named "Choose One of the Following"
  function getCoursesForChooseOne() {
    $scope.chooseOne = $scope.planInfo.plan.available_courses.find(function(category) {
      return category.name == "Choose one of the following";
    });
  }

  $scope.totalCoreCredits = countCredits(plan.plan.required_courses);
  $scope.$watch('planInfo.plan.concentration', getCategoryHourTotals);
  $scope.$watch('planInfo.plan.concentration', getConcentrationSpecificCourses);
  $scope.$watch('planInfo.plan.concentration', getCoursesForChooseOne);


}]);