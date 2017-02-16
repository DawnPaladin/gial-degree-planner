planner.directive('courseRow', function() {
  return {
    restrict: 'E',
    templateUrl: '/directives/course-row.html',
    transclude: true,
    replace: true,
    scope: {
      course: '=',
      checkboxCallback: '&'
    }
  };
});