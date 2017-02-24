planner.controller('MeetingsIndexCtrl', ['$scope', 'meetingService',
  function($scope, meetingService) {
    meetingService.getAll().then(function(courses) {
      $scope.courses = courses;
      initializeMeetings();
    });
    var years = ["2017", "2018", "2019", "2020"];
    var terms = ["Spring", "Summer", "Fall"];
    $scope.termHeader = [];
    years.forEach(function(year) {
      $scope.termHeader.push(year);
      $scope.termHeader.push.apply($scope.termHeader, terms);
    });

    var initializeMeetings = function() {
      var meetings = [];
      $scope.courses.forEach(function(course) {
        meetings.push.apply(meetings, course.meetings);
        course.attendance = [];
        var yearAttendance = {
          spring: "",
          summer: "",
          fall: "",
          any: ""
        };
        course.meetings.forEach(function(meeting) {
          var term = meeting.term.toLowerCase();
          yearAttendance[term] = {
            count: meeting.enrollments.length,
            meeting_id: meeting.id
          };
        });
        years.forEach(function() {
          course.attendance.push("", yearAttendance.spring, yearAttendance.summer, yearAttendance.fall);
        });
      });
    };



    $scope.showCourseModal = function() {
      angular.element('#new-course-form').modal('show');
    };

    $scope.showMeeting = function(id) {
      meetingService.get(id)
        .then(function(meeting) {
          $scope.meeting = meeting;
          angular.element('#edit-meeting').modal('show');
        }, function(error) {
          console.error(error);
        });

    };

  }
]);
