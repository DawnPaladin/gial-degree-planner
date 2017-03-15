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
        if (scope.courseParams && !scope.courseParams.sessions) {
          scope.courseParams.session_ids = [];
          scope.courseParams.pristineSessions = true;
        } else {
          scope.courseParams.session_ids = scope.courseParams.sessions.map(function(session) {
            return session.id;
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

      scope.toggleSelection = function toggleSelection(sessionId) {
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

      scope.submitForm = function(formValid) {
        var continuousSessions = checkSessionsContinuous();
        if (formValid && continuousSessions) {
          if (scope.courseParams.id) {
            _updateCourse();
          } else {
            _createCourse();
          }
        } else {
          if (!continuousSessions) {
            angular.element('.sessions').addClass('error-border');
          } else {
            angular.element('.sessions').removeClass('error-border');
          }
        }
      };

      var _updateCourse = function() {
        return courseService.update(scope.courseParams)
          .then(function() {
            angular.element("[data-dismiss=modal]").click();
          });
      };

      var _createCourse = function() {
        var pertinentService;
        // if (scope.courseParams.localCourse) {
          pertinentService = courseService;
        // }
        pertinentService.create(scope.courseParams)
          .then(function(course) {
            var result = scope.afterSave({course: course});
            angular.element("[data-dismiss=modal]").click();
            return result;
          }, function(error) {
            // Flash.create('warning', error);
          });
      };

      scope.checkFormValidity = function() {
        scope.continuousSessions = checkSessionsContinuous();
        var validFields = checkValidFields();
        scope.courseForm.$valid = validFields && !!scope.courseParams.session_ids.length && scope.continuousSessions;
        scope.courseForm.$invalid = !scope.courseForm.$valid;
      };

      var checkSessionsContinuous = function() {
        var sessions = scope.courseParams.session_ids;
        if (!sessions.length) {
          return false;
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

      scope.setForeignCourseAttrs = function() {
        scope.courseParams.term_id = scope.terms.find(function(term) {
          return term.name == 'Any';
        }).id;
        scope.courseParams.session_ids = scope.sessions.map(function(session) {
          return session.id;
        });
      };

      scope.clearSessionsTerms = function() {
        scope.courseParams.session_ids = [];
        scope.courseParams.term_id = [];
      };

      scope.buttonValue = function() {
        return scope.courseParams.id ? 'Update Course' : 'Create Course';
      };

    }
  };
}]);