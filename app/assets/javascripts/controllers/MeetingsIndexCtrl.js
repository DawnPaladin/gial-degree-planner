planner.controller('MeetingsIndexCtrl', ['$scope', 'courses',
  function($scope, courses) {
    $scope.courses = courses;
    var years = ["2017", "2018", "2019", "2020"];
    var terms = ["Spring", "Summer", "Fall"];
    $scope.termHeader = [];
    years.forEach(function(year) {
      $scope.termHeader.push(year);
      $scope.termHeader.push.apply($scope.termHeader, terms);
    });

    var meetings = [];
    courses.forEach(function(course) {
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
        yearAttendance[term] = meeting.enrollments.length;
      });
      years.forEach(function() {
        course.attendance.push("", yearAttendance.spring, yearAttendance.summer, yearAttendance.fall);
      });
    });


    $scope.showCourseModal = function() {
      angular.element('#new-course-form').modal('show');
    };

  }
]);
