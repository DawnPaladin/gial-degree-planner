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

      scope.course = angular.copy(scope.course, {});

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
        var continuousSessions = checkSessionsContinuous();
        if (formValid && continuousSessions) {
          if (scope.course.id) {
            return courseService.update(scope.course)
              .then(function() {
                angular.element("[data-dismiss=modal]").click();
              });
          } else {
            courseService.create(scope.course)
              .then(function(course) {
                // example of afterSave: addElective which takes
                // the created course and adds it as an elective
                var result = scope.afterSave(course);
                angular.element("[data-dismiss=modal]").click();
                return result;
              }, function(error) {
                // Flash.create('warning', error);
              });
          }
        } else {
          if (!continuousSessions) {
            angular.element('.sessions').addClass('error-border');
          } else {
            angular.element('.sessions').removeClass('error-border');
          }
        }
      };

      var checkSessionsContinuous = function() {
        var sessions = scope.course.session_ids;
        if (!sessions.length) {
          return false;
        } else if (sessions.length === 1) {
          return true;
        }

        return (Math.max.apply(null, sessions) - Math.min.apply(null, sessions)) === sessions.length - 1;
      };

    }
  };
}]);