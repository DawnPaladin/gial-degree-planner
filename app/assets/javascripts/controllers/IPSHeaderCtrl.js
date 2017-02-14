planner.controller('IPSHeaderCtrl', ['$scope', 'student', 'planService', 'concentrationService',
  function($scope, student, planService, concentrationService) {
  
  $scope.student = student;

  // TODO get from plan instead of student
  $scope.concentrations = student.plan.degree.concentrations;
  $scope.planInfo = planService.getPlanInfo();

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

  $scope.$on('toggle-concentration', function() {
    if ($scope.concentrationDisabled) {
      $scope.concentrationDisabled = false;
    } else {
      $scope.concentrationDisabled = true;
    }
  });

  $scope.exportIPS = function() {
    window.print();
  };


}]);
