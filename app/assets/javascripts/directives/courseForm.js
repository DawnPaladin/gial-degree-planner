planner.directive('courseForm', ['Restangular', '$timeout', 'courseService', 'termService', function(Restangular, $timeout, courseService, termService) {
  return {
    restrict: 'E',
    templateUrl : '/directives/course-form.html',
    scope: {
      afterSave: '&'
    },
    link: function(scope) {

      // would rather use
      // ng-checked="(levelName == 'Graduate')"
      scope.newCourse = {
        level: 'Graduate'
      };

      scope.levels = ['Graduate', 'Undergraduate'];
      termService.getTerms()
        .then(function(terms) {
          scope.terms = terms;
        });

      scope.createCourse = function(formValid) {
        if (formValid) {
          courseService.create(scope.newCourse)
            .then(function(course) {
              var result = scope.afterSave(course);
              return result;
            });
        }
      };

    }
  };
}]);