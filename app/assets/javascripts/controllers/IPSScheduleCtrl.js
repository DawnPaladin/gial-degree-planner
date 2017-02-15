planner.controller('IPSScheduleCtrl', ['$scope', '$rootScope', 'planService', '$window', function($scope, $rootScope, planService, $window) {

  $rootScope.$broadcast('toggle-concentration');

  $scope.planInfo = planService.getPlanInfo();

  $scope.possibleYears = $scope.planInfo.possibleYears;

  $scope.years = [$scope.possibleYears[0]];

  var nextYear = 1;

  $scope.addYear = function() {
    if ($scope.possibleYears[nextYear]) {
      $scope.years.push($scope.possibleYears[nextYear]);
      nextYear++;
    }
  };


  $scope.handleDrop = function() {
    console.log('dropped');
  };

  var stickyContainer = document.getElementById('sticky-container');
  var stickyContainerLocation = stickyContainer.getBoundingClientRect().top;
  var stickyContainerWidth = stickyContainer.offsetWidth;
  var page = document.getElementById('page');

  var stuckCourses = function() {
    stickyContainer.setAttribute("style", 'position: fixed; top: 0; left: 0; background: rgba(240, 240, 240, 0.8);');
  };

  var unstuckCourses = function() {
    stickyContainer.setAttribute("style", 'position: static;')
  }

  var stickyCourses = function() {
    console.log(page.scrollTop);
    console.log(stickyContainerLocation);
    if (page.scrollTop > stickyContainerLocation) {
      console.log('true');
      stuckCourses();
    } else {
      unstuckCourses();
    }
  };

  $window.addEventListener('load', function() {
    $window.off();
    $window.addEventListener('scroll', function(e) {
      stickyCourses();
    });
  });

  $window.addEventListener('scroll', function(e) {
    console.log('scroll');
    stickyCourses();
  });



}]);