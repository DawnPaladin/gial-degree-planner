planner.controller('MeetingsIndexCtrl', ['$scope', 'courses', 'meetingService',
  function($scope, courses, meetingService) {
    $scope.courses = courses;
    var years = ["2017", "2018", "2019", "2020"];
    var terms = ["Spring", "Summer", "Fall"];
    $scope.termHeader = [];
    years.forEach(function(year) {
      $scope.termHeader.push(year);
      $scope.termHeader.push.apply($scope.termHeader, terms);
    });

    var meetings = [];
    courses.forEach(function getCourseAttendance(course) {
      meetings.push.apply(meetings, course.meetings);
      course.attendance = [];
      years.forEach(function(year) {
        var yearAttendance = {
          spring: {},
          summer: {},
          fall: {},
          any: {},
        };
        course.meetings.forEach(function storeYearAttendance(meeting) {
          if (meeting.year !== Number(year)) { return; }
          var term = meeting.term.toLowerCase();
          yearAttendance[term] = {
            count: meeting.enrollments.length,
            meeting_id: meeting.id,
          }
        });
        course.attendance.push("", yearAttendance.spring, yearAttendance.summer, yearAttendance.fall);
      });
    });



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
