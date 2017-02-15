planner.controller('MeetingsIndexCtrl', ['$scope', 'courses',
  function($scope, courses) {
    $scope.courses = courses;
    $scope.terms = [{
      name: "Spring",
      width: 4,
      sessions: ["S1", "S2", "S3", "S4"]
    }, {
      name: "Summer",
      width: 1,
      sessions: [""]
    }, {
      name: "Fall",
      width: 4,
      sessions: [1,2,3,4]
    }];
    // $scope.terms = ["2016", "Spring", "S1", "S2", "S3", "S4", "Summer", "Fall", "S1", "S2", "S3", "S4"]
    // $scope.terms = ["Spring", "Summer", "Fall"];
    $scope.sessions = ["S1", "S2", "S3", "S4", "Summer", "S1", "S2", "S3", "S4"];

    var meetings = [];
    courses.forEach(function(course) {
      meetings.push.apply(meetings, course.meetings);
      course.attendance = {
        spring: [0,0,0,0],
        summer: [0],
        fall: [0,0,0,0],
        any: []
      };
      course.meetings.forEach(function(meeting) {
        var term = meeting.term.toLowerCase();
        var sessionIndex = meeting.session.slice(-1) - 1;
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
