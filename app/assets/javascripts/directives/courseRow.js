planner.directive('courseRow', function() {
  return {
    restrict: 'A',
    templateUrl: '/directives/course-row.html',
    scope: {
      course: '=',
      checkboxCallback: '&'
    }
  };
});