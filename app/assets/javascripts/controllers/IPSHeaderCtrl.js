planner.controller('IPSHeaderCtrl', ['$scope', 'student', 'concentrations', function($scope, student, concentrations) {
  
  $scope.concentrations = concentrations;
  $scope.student = student;

  $scope.terms = ['SPRING', 'SUMMER', 'FALL'];

  var _populateYears = function() {  
    $scope.possibleYears = [];
    var currentYear = new Date().getFullYear();
    for (var i = 0; i < 10; i++) {
      var year = currentYear + i;
      $scope.possibleYears.push(year);
    }
  };
  _populateYears();

}])