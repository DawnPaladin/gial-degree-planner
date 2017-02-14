planner.controller('StudentsIndexCtrl', ['$scope', 'Restangular', 'advisors', 'students',
  function($scope, Restangular, advisors, students) {

    $scope.advisors = advisors;
    $scope.property = "last_name";
    $scope.reverse = false;

    students.forEach(function(current) { current.pinned = false; });
    students[0].pinned = true;
    $scope.students = students;

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

    $scope.updateAdvisor = function(student) {
      console.log(student);
      student.put().then(function(response) {
        console.log("Success", response);
      }, function(response) {
        console.warn("Failure", response);
      });
    };

  }
]);
