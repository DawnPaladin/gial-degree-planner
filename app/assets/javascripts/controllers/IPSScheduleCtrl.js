planner.controller('IPSScheduleCtrl', ['$scope', '$rootScope', 'planService', 'Flash', function($scope, $rootScope, planService, Flash) {

  $rootScope.$broadcast('toggle-concentration', { enabled: false });

  $scope.planInfo = planService.getPlanInfo();

  $scope.stickableData = {
    addPadding: true,
    stickablePaddingAdd: document.getElementById('schedule'),
    getWidth: false
  };

  var messages = {
    'courseScheduled': "Course scheduled!",
    'courseUnscheduled': "Course removed from schedule"
  };


  $scope.handleDrop = function(courseId, meetingData) {

    meetingData.course_id = courseId;

    if (meetingData.id == 'sticky-container') { 
      planService.disenrollFromMeeting(meetingData).then(function(response) {
        Flash.create('warning', messages.courseUnscheduled);
        return false;
      });
    } else {
      planService.enrollInMeeting(meetingData).then(function(response){
        Flash.create('success', messages.courseScheduled);
      });
    }

  };

}]);
