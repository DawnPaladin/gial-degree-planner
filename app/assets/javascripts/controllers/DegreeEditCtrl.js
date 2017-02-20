planner.controller('DegreeEditCtrl', ['$scope', 'degree',
  function($scope, degree) {
    $scope.degree = degree;

    $scope.saveDegree = function() {
      degree.put();
    };
  }
]);
