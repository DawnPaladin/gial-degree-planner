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

      scope.courseParams = angular.copy(scope.course, {});

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
        angular.copy(scope.course, scope.courseParams);
        if (scope.courseParams && (!scope.courseParams.sessions || !scope.courseParams.terms)) {
          scope.courseParams.session_ids = [];
          scope.courseParams.term_ids = [];
          scope.courseParams.pristineSessions = true;
        } else {
          scope.courseParams.session_ids = scope.courseParams.sessions.map(function(session) {
            return session.id;
          });
          scope.courseParams.term_ids = scope.courseParams.terms.map(function(term) {
            return term.id;
          });
        }
      }, true);

      scope.$watch("courseParams", function(){
        scope.checkFormValidity();
      }, true);

      angular.element(document.body).on('hide.bs.modal', function () {
          if (!scope.courseParams.id) {
            scope.courseParams = { pristineSessions: true, session_ids: [] };
            scope.courseForm.$setPristine();
            scope.courseForm.$setUntouched();
          }
      });

      scope.toggleSessionSelection = function toggleSessionSelection(sessionId) {
        scope.courseParams.pristineSessions = false;
        var idx = scope.courseParams.session_ids.indexOf(sessionId);
        if (idx > -1) {
          scope.courseParams.session_ids.splice(idx, 1);
        }
        else {
          scope.courseParams.session_ids.push(sessionId);
        }
        scope.checkFormValidity();
      };
      scope.toggleTermSelection = function toggleTermSelection(termId) {
        scope.courseParams.pristineTerms = false;
        var idx = scope.courseParams.term_ids.indexOf(termId);
        if (idx > -1) {
          scope.courseParams.term_ids.splice(idx, 1);
        }
        else {
          scope.courseParams.term_ids.push(termId);
        }
        scope.checkFormValidity();
      };

      scope.submitForm = function(formValid) {
        var continuousSessions = checkSessionsContinuous();
        if (formValid && continuousSessions) {
          if (scope.courseParams.id) {
            return courseService.update(scope.courseParams)
              .then(function() {
                angular.element("[data-dismiss=modal]").click();
              });
          } else {
            courseService.create(scope.courseParams)
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

      scope.checkFormValidity = function() {
        scope.continuousSessions = checkSessionsContinuous();
        var validFields = checkValidFields();
        scope.courseForm.$valid = validFields && scope.continuousSessions;
        scope.courseForm.$invalid = !scope.courseForm.$valid;
      };

      var checkSessionsContinuous = function() {
        var sessions = scope.courseParams.session_ids;
        if (!sessions.length) {
          return true;
        } else if (sessions.length === 1) {
          return true;
        }

        return (Math.max.apply(null, sessions) - Math.min.apply(null, sessions)) === sessions.length - 1;
      };

      var checkValidFields = function() {
        return scope.courseForm.$$controls.every(function(field) {
          return field.$valid;
        });
      };

      scope.buttonValue = function() {
        return scope.courseParams.id ? 'Update Course' : 'Create Course';
      };

    }
  };
}]);
