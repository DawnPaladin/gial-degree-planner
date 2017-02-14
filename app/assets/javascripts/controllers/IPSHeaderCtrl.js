planner.controller('IPSHeaderCtrl', ['$scope', 'student', 'planService',
  function($scope, student, planService) {
  
  $scope.student = student;

  // All static information comes over
  // on initial load
  // Student + Degree + List of Concentrations
  $scope.concentrations = student.degree.concentrations;

  $scope.planInfo = planService.getPlanInfo();
  $scope.plan = $scope.planInfo.plan;

  $scope.terms = ['SPRING', 'SUMMER', 'FALL'];

  // For all plan updates except for updates to latest_registered and registration_date
  $scope.updatePlan = function() {
    planService.update($scope.planInfo.plan).then(function(plan) {
      $scope.unregisterIPS();
    });
  };

  // Only for updates to latest_registered and registration_date
  $scope.updateRegistration = function() {
    planService.update($scope.planInfo.plan);
  };

  // Allows user to toggle whether the IPS has been registered or not
  $scope.toggleRegistration = function() {
    if ($scope.planInfo.plan.latest_registered) {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      $scope.planInfo.plan.registration_date = new Date(year, month, day);
    }
    $scope.updateRegistration();
  };

  // Unregisters the IPS
  $scope.unregisterIPS = function() {
    $scope.planInfo.plan.latest_registered = false;
    $scope.toggleRegistration();
  }

  $scope.exportIPS = function() {
    window.print();
  };


}]);
