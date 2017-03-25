planner.directive('meetingForm', ['Restangular', '$timeout', 'meetingService', 'Flash', function(Restangular, $timeout, meetingService, Flash) {
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
            Flash.create('success', 'Class updated. Please refresh the page.');
            angular.element('#edit-meeting').modal('hide');
          }, function(error) {
            var errorMessage = '';
            if (error.statusText == "Unprocessable Entity" && error.data) {
              for (var key in error.data) {
                if (error.data.hasOwnProperty(key)) {
                  errorMessage += key + ' ';
                  errorMessage += error.data[key].join(',');
                }
              }
              Flash.create('danger', errorMessage);
            }
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
