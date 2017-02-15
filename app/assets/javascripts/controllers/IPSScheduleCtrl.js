planner.controller('IPSScheduleCtrl', ['$scope', '$rootScope', 'planService', '$window', '$timeout', '_', function($scope, $rootScope, planService, $window, $timeout, _) {

  $rootScope.$broadcast('toggle-concentration');

  $scope.planInfo = planService.getPlanInfo();

  $scope.possibleYears = $scope.planInfo.possibleYears;

  $scope.years = [$scope.possibleYears[0]];

  var nextYear = 1;

  $scope.addYear = function() {
    if ($scope.possibleYears[nextYear]) {
      $timeout(function() {
        $scope.years.push($scope.possibleYears[nextYear]);
        nextYear++;
      }, 150);
    }
  };

  var prepareNewYear = function() {
    if ($window.innerHeight + $window.scrollY >= document.body.scrollHeight) {
      $scope.addYear();
    }
  };


  $scope.handleDrop = function() {
    console.log('dropped');
  };

  var stickyContainer = document.getElementById('sticky-container');
  var stickyContainerLocation = stickyContainer.getBoundingClientRect().top;
  var page = document.getElementById('page');
  var pageBottom = page.getBoundingClientRect().bottom;

  var stuckCourses = function() {
    stickyContainer.setAttribute("style", 'position: fixed; top: 0; left: 0; background: rgba(240, 240, 240, 0.8);');
  };

  var unstuckCourses = function() {
    stickyContainer.setAttribute("style", 'position: static;')
  }

  var stickyCourses = function() {
    if (page.scrollTop > stickyContainerLocation) {
      stuckCourses();
    } else {
      unstuckCourses();
    }
  };

  var throttledStickyCourses = _.throttle(stickyCourses, 100);
  var throttledPrepareNewYear = _.throttle(prepareNewYear, 100);

  $window.addEventListener('scroll', function(e) {
    throttledStickyCourses();
    throttledPrepareNewYear();
  });


}]);