planner.controller('MeetingsIndexCtrl', ['$scope', 'meetingService', '_', 'Auth', 'courseService',
  function($scope, meetingService, _, Auth, courseService) {

    meetingService.getAll().then(function(courses) {
      $scope.courses = courses;
      courseService.setCourses($scope.courses);
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
      $scope.courses.forEach(function getCourseAttendance(course) {
        // if (course.number == "AA5386") debugger;
        meetings.push.apply(meetings, course.meetings);
        course.attendance = [];
        years.forEach(function(year) {
          var yearAttendance = {
            spring: {},
            summer: {},
            fall: {},
            any: {},
          };
          // find the course meeting for this year
          var thisYearsMeetings = course.meetings.filter(function(meeting) { return meeting.year === Number(year); });
          thisYearsMeetings.forEach(function(meeting) {
            var term = meeting.term.toLowerCase();
            if (yearAttendance[term].count) {
              yearAttendance[term].count += meeting.enrollments.length;
            } else {
              yearAttendance[term] = {
                count: meeting.enrollments.length,
                meeting_id: meeting.id,
              };
            }
          });
          course.attendance.push("", yearAttendance.spring, yearAttendance.summer, yearAttendance.fall);
        });
      });
    };

    Auth.currentUser()
      .then(function(advisor) {
        $scope.currentAdvisor = advisor;
      }, function(error) {
        console.error(error);
      });


    $scope.newCourse = {};
    $scope.course = {};

    $scope.showNewCourseModal = function() {
      angular.element('#new-course-form').modal('show');
    };

    $scope.showEditCourseModal = function(course) {
      angular.copy(course, $scope.course);
      angular.element('#edit-course-form').modal('show');
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
