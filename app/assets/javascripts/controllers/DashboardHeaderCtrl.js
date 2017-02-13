planner.controller('DashboardHeaderCtrl', ['$scope', 'Auth', function($scope, Auth) {

    Auth.currentUser().then(function(advisor) {
        $scope.currentAdvisor = advisor;
      }, function(response) {
        console.error(response);
      });

}]);
