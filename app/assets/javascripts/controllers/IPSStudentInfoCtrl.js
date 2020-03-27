planner.controller('IPSStudentInfoCtrl', ['$scope', '$state', '$rootScope', '$timeout', 'student', 'studentService', function($scope, $state, $rootScope, $timeout, student, studentService) {

  $scope.student = student;
  $scope.submissionStatus = "";
  
  function setSubmissionStatus(status) {
    $scope.submissionStatus = status;
    $timeout(function() {
      $scope.submissionStatus = "";
    }, 3000);
  }
  
  $scope.submitForm = function(student) {
    setSubmissionStatus("Saving...");
    var promise = studentService.saveStudent(student);
    promise.then(function(result) {
      setSubmissionStatus("Saved.");
    }).catch(function(result) {
      setSubmissionStatus("Error - please reload and try again.");
    });
  }

}]);
