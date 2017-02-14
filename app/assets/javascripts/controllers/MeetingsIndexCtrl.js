planner.controller('MeetingsIndexCtrl', ['$scope', 'courses',
  function($scope, courses) {
    console.log(courses);
    $scope.courses = courses;
  }
]);
