planner.controller('StudentsIndexCtrl', ['$scope', 'Restangular', 'advisors', 'students', 'Auth', 'Flash',
  function($scope, Restangular, advisors, students, Auth, Flash) {

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
      student.save().then(function(response) {
        student.advisor_id = response.advisor_id;
        student.advisor = response.advisor;
        updatePinned(student);
        var message = response.advisor.first_name + ' ' + response.advisor.last_name + " is now the advisor for " + student.first_name + ' ' + student.last_name;
        Flash.create('success', message);
      }, function(response) {
        console.warn(response);
        Flash.create('danger', response.statusText);
      });
    };

    $scope.createStudent = function() {
      var newStudent = Restangular.restangularizeElement(null, $scope.newStudent, 'students');
      newStudent.post()
        .then(function() {
          $scope.newStudent = {};
          $scope.students = Restangular.all('students').getList().$object;
        }, function(error) {
          var errorMessage = "";
          console.warn(error);
          if (error.statusText == "Unprocessable Entity" && error.data) {
            for (var key in error.data) {
              if (error.data.hasOwnProperty(key)) {
                errorMessage += key + ' ';
                errorMessage += error.data[key].join(',');
              }
            }
            Flash.create('danger', errorMessage);
          }
        });
    };

  }
]);
