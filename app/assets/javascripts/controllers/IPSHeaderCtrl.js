planner.controller('IPSHeaderCtrl', ['$scope', '$rootScope', '$window', 'student', 'planService',
  function($scope, $rootScope, $window, student, planService) {

  // All static information comes over
  // on initial load
  // Student + Degree + List of Concentrations
  $scope.student = student;
  $scope.concentrations = student.degree.concentrations;
  $scope.planInfo = planService.getPlanInfo();
  $scope.terms = ['Spring', 'Fall'];
  $scope.plan = $scope.planInfo.plan;

  $scope.$on('onSummary', function() {
    $scope.canPrint = true;
  });

  $scope.$on('offSummary', function() {
    $scope.canPrint = false;
  });

  // For all plan updates except for updates to latest_registered and registration_date
  $scope.updatePlan = function() {
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
    planService.update($scope.planInfo.plan, $scope.planInfo.plan.latest_registered);
  };

  $scope.exportIPS = function() {
    $window.print();
  };

  $scope.$on('toggle-concentration', function(e, args) {
    if (args.enabled) {
      $scope.concentrationDisabled = false;
    } else {
      $scope.concentrationDisabled = true;
    }

  });

}]);
