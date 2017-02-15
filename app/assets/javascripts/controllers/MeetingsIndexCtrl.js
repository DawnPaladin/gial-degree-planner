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

    $scope.meetings = [];
    courses.forEach(function(course) {
      $scope.meetings.push.apply($scope.meetings, course.meetings);
    });

    $scope.years = [];
    $scope.meetings.forEach(function(meeting) {
      if ($scope.years.indexOf(meeting.year) === -1) {
        $scope.years.push(meeting.year);
      }
    });

  }
]);
