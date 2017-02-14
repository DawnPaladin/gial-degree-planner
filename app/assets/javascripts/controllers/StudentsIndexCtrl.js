planner.controller('StudentsIndexCtrl', ['$scope', 'Restangular', 'advisors', 'students', 'Auth',
  function($scope, Restangular, advisors, students, Auth) {

    $scope.advisors = advisors;
    $scope.students = students;
    $scope.property = "last_name";
    $scope.reverse = false;

    Auth.currentUser().then(function(advisor) {
      $scope.currentAdvisor = advisor;
      $scope.students.forEach(function(student) {
        updatePinned(student);
      });
    });

    var updatePinned = function(student) {
      student.pinned = student.advisor.id === $scope.currentAdvisor.id;
    };

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
      console.log("Updating advisor", student);
      student.put().then(function(response) {
        console.log("Response back", response);
        angular.copy(response, student);
        console.log("Copied", student);
        updatePinned(student);
        console.log("Updated", student);
      }, function(response) {
        console.warn(response);
      });
    };

  }
]);
