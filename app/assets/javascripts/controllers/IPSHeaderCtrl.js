planner.controller('IPSHeaderCtrl', ['$scope', 'student', 'planService', function($scope, student, planService) {
  
  $scope.student = student;
  $scope.concentrations = student.plan.degree.concentrations;
  $scope.plan = student.plan;

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

  $scope.updatePlan = function() {
    planService.update($scope.plan).then(function(plan) {
      $scope.plan = plan;
    });
  };


}]);