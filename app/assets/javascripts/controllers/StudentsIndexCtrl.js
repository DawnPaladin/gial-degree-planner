planner.controller('StudentsIndexCtrl', ['$scope', 'Restangular', 'advisors',
  function($scope, Restangular, advisors) {

    // var students = Restangular.all('students');
    // students.getList().then(function(students) {
    //   console.log(students);
    //   $scope.students = students;
    // });

    // $scope.students = Restangular.all('students').getList().$object;
    $scope.advisors = advisors;
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
      if ($scope.property.indexOf(columnName) > -1) {
        classString += "sorted";
        if ($scope.property[0] === "-") {
          classString += " reverse";
        }
      }
      return classString;
    };

    Restangular.all('students').getList().then(function(result) {
      // console.log(result);
      result[0].pinned = true;
      result[1].pinned = false;
      result[2].pinned = false;
      $scope.students = result;
      // $scope.students = result;
    });
  }
]);
