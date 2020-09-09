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

  function getConcentrationInfo() {
    Restangular.one('concentrations', $scope.planInfo.plan.concentration_id).get()
    .then(function(concentrationInfo) {
      getCategoryHourTotals(concentrationInfo);
      getConcentrationSpecificCourses(concentrationInfo);
      getCoursesForChooseOne();
      window.setTimeout(alignDottedLines, 300);
    })
  }

  function getCategoryHourTotals(concentrationInfo) {
    var requiredHoursByCategory = _.pluck(concentrationInfo.categories, 'required_units');
    angular.copy(requiredHoursByCategory, $scope.requiredHoursByCategory);
    return concentrationInfo;
  }

  function getConcentrationSpecificCourses(concentrationInfo) {
    var category = concentrationInfo.categories.find(function(category) {
      return category.name == "Concentration-specific courses";
    });
    if (category) $scope.concentrationSpecificCourses = category.courses;
    return concentrationInfo;
  }

  // The "Arts & Scripture Engagement" concentration needs to show the courses available in the category named "Choose One of the Following"
  function getCoursesForChooseOne() {
    $scope.chooseOne = $scope.planInfo.plan.available_courses.find(function(category) {
      return category.name == "Choose one of the following";
    });
  }

  // If a course's name is long enough that it wraps to two lines, make the date lines in the next cell line up
  function alignDottedLines() {
    $('.course-names').each(function(index, cell) {
      var sourceHeights = $(cell).find('.dotted-line-container .dotted-line-left').map(function(index, element) { 
        return $(element).outerHeight();
      }).get();
      var targets = $(cell).next('.course-dates').find('.dotted-line-container');
      if (sourceHeights.length == targets.length) {
        for (var index = 0; index < sourceHeights.length; index++) {
          $(targets[index]).css('height', sourceHeights[index]);
          // console.log('Adjusted', targets[index], 'to', sourceHeights[index])
        }
      } else {
        console.warn('Mismatch in number of courses for', cell, sourceHeights, targets);
      }
    });
    $('.cell-header').each(function(index, element) {
      var sourceHeight = $(element).outerHeight();
      var $target = $(element).parent().next().find('.dotted-line-spacer');
      $target.css('height', sourceHeight);
    });
  }

  $scope.totalCoreCredits = countCredits(plan.plan.required_courses);
  $scope.$watch('planInfo.plan.concentration', getConcentrationInfo);

}]);