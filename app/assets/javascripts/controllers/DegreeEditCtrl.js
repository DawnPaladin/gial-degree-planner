planner.controller('DegreeEditCtrl', ['$scope', '$timeout', 'degree', 'courseService',
  function($scope, $timeout, degree, courseService) {
    $scope.degree = degree;
    console.log(degree);
    $scope.currentConcentration = {
      name: "",
      categories: [
        {
          name: "Test category",
          required_units: 3
        }
      ],
    };

    function Concentration() {
      this.name = "";
      this.degree_id = degree.id;
    }
    $scope.newConcentration = new Concentration();

    $scope.saveDegree = function() {
      console.log("Outgoing:", $scope.degree);
      $scope.degree.required_course_ids = $scope.degree.required_courses.map(function(course) {
        return course.id;
      });
      $scope.degree.concentrations_attributes = $scope.degree.concentrations;

      $scope.degree.put().then(function(response) {
        console.log(response);
      }, function(response) {
        console.warn(response);
      });
    };

    $scope.editConcentration = function(current) {
      $scope.currentConcentration = current;
    };

    $scope.createConcentration = function() {
      $scope.degree.concentrations.push($scope.newConcentration);
      $scope.addConcentrationVisible = false;
      $scope.newConcentration = new Concentration();
    };

    $scope.deleteConcentration = function(concentration) {
      if (confirm("Are you sure you wish to remove the " + concentration.name + " concentration?")) {
        var index = $scope.degree.concentrations.indexOf(concentration);
        $scope.degree.concentrations.splice(index, 1);
      }
    };

    // "Add a core course" link + typeahead
    courseService.getCourses().then(function(courses) {
      $scope.courses = courses;
      $scope.courseNames = courses.map(function(course) {
        return {
          id: course.id,
          name: course.number + ' ' + course.name,
          units: course.units
        };
      });
    });
    $scope.showCourseInput = function() {
      $scope.addingCoreCourse = true;
      $timeout(function() {
        angular.element('#coreCourseInput').focus();
      });
    };
    $scope.hideCourseInput = function() {
      if (event.relatedTarget === null)
        $scope.addingCoreCourse = false;
    };
    $scope.addCoreCourse = function(courseName) {
      var course = $scope.courses.filter(function(obj) {
        return obj.id === courseName.id;
      })[0];
      $scope.degree.required_courses.push(course);
    };
    $scope.deleteCoreCourse = function(course) {
      var index = $scope.degree.required_courses.indexOf(course);
      $scope.degree.required_courses.splice(index, 1);
    };

  }
]);
