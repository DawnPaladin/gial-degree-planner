planner.directive('courseForm', ['Restangular', '$timeout', 'courseService', 'termService', 'sessionService', 'Flash',
  function(Restangular, $timeout, courseService, termService, sessionService, Flash) {
  return {
    restrict: 'E',
    templateUrl : '/directives/course-form.html',
    scope: {
      afterSave: '&',
      course: '='
    },
    link: function(scope) {

      // would rather use
      // ng-checked="(levelName == 'Graduate')"
      // scope.newCourse = {
      //   level: 'Graduate'
      // };

      scope.levels = ['Graduate', 'Undergrad'];
      termService.getTerms()
        .then(function(terms) {
          scope.terms = terms;
        });

      sessionService.getSessions()
        .then(function(sessions) {
          scope.sessions = sessions;
        });
      
      scope.$watch('course', function() {
        if (scope.course && !scope.course.sessions) {
          scope.course.session_ids = [];
        } else {
          console.log('in else', scope.course.sessions)
          scope.course.session_ids = scope.course.sessions.map(function(session) {
            return session.id;
          });
        }
      });
      

      scope.toggleSelection = function toggleSelection(sessionId) {
        var idx = scope.course.session_ids.indexOf(sessionId);
        if (idx > -1) {
          scope.course.session_ids.splice(idx, 1);
        }
        else {
          scope.course.session_ids.push(sessionId);
        }
      };

      scope.submitForm = function(formValid) {
        if (formValid) {
          if (scope.course.id) {
            return courseService.update(scope.course);
          } else {
            courseService.create(scope.course)
              .then(function(course) {
                // example of afterSave: addElective which takes
                // the created course and adds it as an elective
                var result = scope.afterSave(course);
                return result;
              }, function(error) {
                // Flash.create('warning', error);
              });
          }
        }
      };

    }
  };
}]);