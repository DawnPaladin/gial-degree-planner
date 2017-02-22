planner.controller('IPSScheduleCtrl', ['$scope', '$rootScope', 'planService', '$window', '$timeout', '_', 'Flash', function($scope, $rootScope, planService, $window, $timeout, _, Flash) {

  $rootScope.$broadcast('toggle-concentration', { enabled: false });

  $scope.planInfo = planService.getPlanInfo();

  // Fix years

  $scope.possibleYears = $scope.planInfo.possibleYears;

  $scope.years = [$scope.possibleYears[0], $scope.possibleYears[1]];

  var nextYear = 2;
  var messages = {
    'courseScheduled': "Course scheduled!",
    'courseUnscheduled': "Course removed from schedule"
  };

  $scope.addYear = function() {
    if ($scope.possibleYears[nextYear]) {
      $timeout(function() {
        $scope.years.push($scope.possibleYears[nextYear]);
        nextYear++;
      }, 250);
    }
  };

  var prepareNewYear = function() {
    if ($window.innerHeight + $window.scrollY >= document.body.scrollHeight) {
      $scope.addYear();
    }
  };


  $scope.handleDrop = function(courseId, meetingData) {

    meetingData.course_id = courseId;

    if (meetingData.id == 'sticky-container') { 
      planService.disenrollFromMeeting(meetingData).then(function(response) {
        Flash.create('warning', messages.courseUnscheduled);
        return false;
      });
    } else {
      planService.enrollInMeeting(meetingData).then(function(response){
        Flash.create('success', messages.courseScheduled);
      });
    }

  };


  // TODO Refactor fixed functionality into directive
  var stickyContainer = document.getElementById('sticky-container');
  var stickyContainerLocation = stickyContainer.getBoundingClientRect().top;
  var page = document.getElementById('page');
  var schedule = document.getElementById('schedule');
  var pageBottom = page.getBoundingClientRect().bottom;

  var stuckCourses = function() {
    var stickyContainerHeight = stickyContainer.offsetHeight;
    angular.element(stickyContainer).addClass('stuck');
    schedule.setAttribute("style", 'padding-top: ' + stickyContainerHeight + 'px;');
  };

  var unstuckCourses = function() {
    if (angular.element(stickyContainer).hasClass('stuck')) { 
      angular.element(stickyContainer).removeClass('stuck'); 
    }
    schedule.setAttribute("style", 'padding-top: 0px;');
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

  var throttledListeners = function() {
    throttledStickyCourses();
    throttledPrepareNewYear();
  };

  $window.addEventListener('scroll', throttledListeners);

  $rootScope.$on('$stateChangeStart', function() {
    $window.removeEventListener('scroll', throttledListeners);
  });


}]);