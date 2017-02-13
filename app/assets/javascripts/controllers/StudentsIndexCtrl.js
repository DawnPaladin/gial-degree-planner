planner.controller('StudentsIndexCtrl', ['$scope', 'Restangular', function($scope, Restangular) {

  // var students = Restangular.all('students');
  // students.getList().then(function(students) {
  //   console.log(students);
  //   $scope.students = students;
  // });

  // $scope.students = Restangular.all('students').getList().$object;
  $scope.advisors = Restangular.all('advisors').getList().$object;
  $scope.property = "last_name";
  $scope.reverse = false;

  $scope.alternate = function(property) {
    if ($scope.property == property) {
      $scope.property = "-" + property;
      $scope.reverse = true;
    } else {
      $scope.property = property;
      $scope.reverse = false;
    }
  };

  $scope.sortableClasses = function(columnName) {
    var classString = "";
    if ($scope.property.indexOf(columnName) === -1) {
      return classString;
    } else {
      if ($scope.property[0] === "-") {
        classString += "reverse ";
      }
      classString += "sorted";
      return classString;
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
