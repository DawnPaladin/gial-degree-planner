planner.directive('courseForm', ['Restangular', '$timeout', 'courseService', 'termService', 'sessionService', function(Restangular, $timeout, courseService, termService, sessionService) {
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

      scope.levels = ['Graduate', 'Undergrad'];
      termService.getTerms()
        .then(function(terms) {
          scope.terms = terms;
        });

      sessionService.getSessions()
        .then(function(sessions) {
          scope.sessions = sessions;
        });
      
      scope.newCourse.sessions = [];

      scope.toggleSelection = function toggleSelection(sessionId) {
        var idx = scope.newCourse.sessions.indexOf(sessionId);

        // Is currently selected
        if (idx > -1) {
          scope.newCourse.sessions.splice(idx, 1);
        }

        // Is newly selected
        else {
          scope.newCourse.sessions.push(sessionId);
        }
      };


      scope.createCourse = function(formValid) {
        if (formValid) {
          courseService.create(scope.newCourse)
            .then(function(course) {
              // example of afterSave: addElective which takes
              // the created course and adds it as an elective
              var result = scope.afterSave(course);
              return result;
            });
        }
      };

    }
  };
}]);