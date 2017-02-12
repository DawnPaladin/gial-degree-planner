planner.controller('DashboardHeaderCtrl', ['$scope', 'Auth', function($scope, Auth) {

    Auth.currentUser().then(function(advisor) {
        $scope.currentAdvisor = advisor;
        console.log(advisor);
      }, function(response) {
        console.error(response);
      });

}]);
