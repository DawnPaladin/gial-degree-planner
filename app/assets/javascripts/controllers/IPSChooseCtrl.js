planner.controller('IPSChooseCtrl', ['$scope', '$state', 'student', 'concentrations', function($scope, $state, student, concentrations) {
  
  $scope.student = student;
  $scope.concentrations = concentrations;

}]);