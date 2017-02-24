planner.controller('StudentsIndexCtrl', ['$scope', 'Restangular', 'Auth', 'Flash', 'studentService', 'advisorService',
  function($scope, Restangular, Auth, Flash, studentService, advisorService) {

    studentService.getAll().then(function(students) {
      $scope.students = students;
      getCurrentUser();
    });

    advisorService.getAll().then(function(advisors) {
      $scope.advisors = advisors;
    });    

    $scope.property = "last_name";
    $scope.reverse = false;

    var getCurrentUser = function() {
      Auth.currentUser().then(function(advisor) {
        $scope.currentAdvisor = advisor;
        $scope.students.forEach(function(student) {
          updatePinned(student);
        });
      });
    }

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
      Restangular.all('students').post($scope.newStudent)
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
