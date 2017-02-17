planner.controller('IPSHeaderCtrl', ['$scope', '$rootScope', '$window', 'student', 'planService',
  function($scope, $rootScope, $window, student, planService) {
  
  // All static information comes over
  // on initial load
  // Student + Degree + List of Concentrations
  $scope.student = student;
  $scope.concentrations = student.degree.concentrations;
  $scope.planInfo = planService.getPlanInfo();
  $scope.terms = ['Spring', 'Summer', 'Fall'];
  $scope.plan = $scope.planInfo.plan;

  // For all plan updates except for updates to latest_registered and registration_date
  $scope.updatePlan = function() {
    planService.update($scope.planInfo.plan)
      // .then(function(plan) {
      //   $rootScope.$broadcast('planChanged', plan);
      // });
  };

  // Only for updates to latest_registered and registration_date
  // $scope.updateRegistration = function() {
  //   planService.update($scope.planInfo.plan);
  // };

  // $rootScope will broadcast plan changed
  // $rootScope does not receive a plan changed event
  // if only the registration changes,
  // and does not broadcast one
  // $scope.$on('planChanged', function(event, args) {
  //   $scope._unregisterIPS();
  // });

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

  // Unregisters the IPS
  // $scope._unregisterIPS = function() {
  //   $scope.planInfo.plan.latest_registered = false;
  //   $scope.toggleRegistration();
  // }

  $scope.$on('toggle-concentration', function(e, args) {
    if (args.enabled) {
      $scope.concentrationDisabled = false;      
    } else {
      $scope.concentrationDisabled = true;      
    }

  });

}]);
