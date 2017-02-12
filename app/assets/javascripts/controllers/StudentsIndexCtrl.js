planner.controller('StudentsIndexCtrl', ['$scope', 'Restangular', function($scope, Restangular) {

  // var students = Restangular.all('students');
  // students.getList().then(function(students) {
  //   console.log(students);
  //   $scope.students = students;
  // });

  $scope.students = Restangular.all('students').getList().$object;
  $scope.advisors = Restangular.all('advisors').getList().$object;

  Restangular.all('students').getList().then(function(result) {
    console.log(result);
    // $scope.students = result;
  });

}]);
