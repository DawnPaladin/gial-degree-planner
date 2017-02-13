planner.controller('StudentsIndexCtrl', ['$scope', 'Restangular', function($scope, Restangular) {

  // var students = Restangular.all('students');
  // students.getList().then(function(students) {
  //   console.log(students);
  //   $scope.students = students;
  // });

  // $scope.students = Restangular.all('students').getList().$object;
  $scope.advisors = Restangular.all('advisors').getList().$object;
  $scope.property = "last_name";

  $scope.alternate = function(property) {
    if ($scope.property == property) {
      $scope.property = "-" + property;
    } else {
      $scope.property = property;
    }
  };

  Restangular.all('students').getList().then(function(result) {
    result[0].pinned = true;
    result[1].pinned = false;
    result[2].pinned = false;
    result[3].pinned = false;
    $scope.students = result;
    console.log(result);
    // $scope.students = result;
  });

}]);
