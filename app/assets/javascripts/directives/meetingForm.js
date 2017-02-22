planner.directive('meetingForm', ['Restangular', '$timeout', 'meetingService', function(Restangular, $timeout, meetingService) {
  return {
    restrict: 'E',
    templateUrl : '/directives/meeting-form.html',
    scope: true,
    link: function(scope) {

      scope.titles = ['Dr.', 'Mr.', 'Mrs.', 'Ms.'];
      scope.newTeacher = {};

      scope.addingTeacher = false;

      scope.updateMeeting = function(meeting) {
        meetingService.update(meeting)
          .then(function(meeting) {
            // flash message
            angular.element('#edit-meeting').modal('hide');
          }, function(error) {
            console.error(error);
          });
      };

      scope.showInput = function() {
        scope.addingTeacher = true;
      };

      scope.hideInput = function() {
        scope.newTeacher = {};
        scope.addingTeacher = false;
      };

      scope.addTeacher = function() {
        scope.meeting.teachers_attributes.push(scope.newTeacher);
        scope.hideInput();
        scope.newTeacher = {};
      };

    }
  };
}]);