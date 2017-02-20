planner.controller('IPSScheduleCtrl', ['$scope', '$rootScope', 'planService', '$window', '$timeout', '_', 'Flash', 'terms', function($scope, $rootScope, planService, $window, $timeout, _, Flash, terms) {

  $rootScope.$broadcast('toggle-concentration', { enabled: false });

  $scope.planInfo = planService.getPlanInfo();

  $scope.possibleYears = $scope.planInfo.possibleYears;

  $scope.years = [$scope.possibleYears[0], $scope.possibleYears[1]];

  $scope.terms = terms;

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

    var data = {
      meeting_data: {
        'course_id': courseId,
        'year': meetingData.meetingYear,
        'term': meetingData.meetingTerm.name,
        'session': meetingData.meetingSession.name
      }
    };

    if (meetingData.id == 'sticky-container') { 
      planService.disenrollFromMeeting(data).then(function(response) {
        Flash.create('warning', messages.courseUnscheduled);
        return false;
      });
    } else {
      planService.enrollInMeeting(data).then(function(response){
        Flash.create('success', messages.courseScheduled);
      });
    }

  };


  // TODO Refactor fixed functionality into directive
  var stickyContainer = document.getElementById('sticky-container');
  var stickyContainerLocation = stickyContainer.getBoundingClientRect().top - 35;
  var page = document.getElementById('page');
  var schedule = document.getElementById('schedule');
  var pageBottom = page.getBoundingClientRect().bottom;

  var stuckCourses = function() {
    var stickyContainerHeight = stickyContainer.offsetHeight;
    stickyContainer.setAttribute("style", 'position: fixed; top: 0; left: 0; background: rgba(240, 240, 240, 0.8);');
    schedule.setAttribute("style", 'padding-top: ' + stickyContainerHeight + 'px;');
  };

  var unstuckCourses = function() {
    stickyContainer.setAttribute("style", 'position: static;')
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