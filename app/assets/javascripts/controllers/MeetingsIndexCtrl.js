planner.controller('MeetingsIndexCtrl', ['$scope', 'meetingService', '_', 'Auth', 'courseService',
  function($scope, meetingService, _, Auth, courseService) {

    meetingService.getAll().then(function(courses) {
      $scope.courses = courses;
      courseService.setCourses($scope.courses);
      initializeMeetings();
    });

    var years = courseService.nextSeveralYears(4);
    var terms = ["Spring", "Summer", "Fall", "May", "ME"];
    $scope.termHeader = [];
    years.forEach(function(year) {
      $scope.termHeader.push(year);
      $scope.termHeader.push.apply($scope.termHeader, terms);
    });


    var initializeMeetings = function() {
      $scope.courses.forEach(function(course) { courseService.getCourseAttendance(course); });
    };

    Auth.currentUser()
      .then(function(advisor) {
        $scope.currentAdvisor = advisor;
      }, function(error) {
        console.error(error);
      });


    $scope.newCourse = {};
    $scope.course = {};

    $scope.showNewCourseModal = function() {
      angular.element('#new-course-form').modal('show');
    };

    $scope.showEditCourseModal = function(course) {
      angular.copy(course, $scope.course);
      angular.element('#edit-course-form').modal('show');
    };

    $scope.showMeeting = function(id) {
      meetingService.get(id)
        .then(function(meeting) {
          $scope.meeting = meeting;
          angular.element('#edit-meeting').modal('show');
        }, function(error) {
          console.error(error);
        });
    };
  }
]);
