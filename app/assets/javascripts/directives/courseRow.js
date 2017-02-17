planner.directive('courseRow', function() {
  return {
    restrict: 'AE',
    templateUrl: '/directives/course-row.html',
    transclude: true,
    replace: true,
    scope: {
      course: '=',
      section: '@',
      checkboxCallback: '&',
      buttonCallback: '&'
    }
  };
});