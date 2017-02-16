planner.controller('MeetingsIndexCtrl', ['$scope', 'courses',
  function($scope, courses) {
    $scope.courses = courses;
    $scope.terms = [{
      name: "Spring",
      width: 4,
    }, {
      name: "Summer",
      width: 1,
    }, {
      name: "Fall",
      width: 4,
    }];
    $scope.sessions = ["S1", "S2", "S3", "S4", "Summer", "S1", "S2", "S3", "S4"];

    var meetings = [];
    courses.forEach(function(course) {
      meetings.push.apply(meetings, course.meetings);
      course.attendance = {
        spring: ["","","",""],
        summer: [""],
        fall: ["","","",""],
        any: []
      };
      course.meetings.forEach(function(meeting) {
        var term = meeting.term.toLowerCase();
        var sessionIndex = meeting.session - 1;
        if (sessionIndex < 0) { return; }
        course.attendance[term][sessionIndex] = meeting.enrollments.length;
      });
    });

    $scope.years = [];
    meetings.forEach(function(meeting) {
      if ($scope.years.indexOf(meeting.year) === -1) {
        $scope.years.push(meeting.year);
      }
    });

  }
]);
