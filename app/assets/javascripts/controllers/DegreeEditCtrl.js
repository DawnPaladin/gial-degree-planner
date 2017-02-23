planner.controller('DegreeEditCtrl', ['$scope', '$timeout', 'degree', 'courseService', 'concentrationService', 'Flash',
  function($scope, $timeout, degree, courseService, concentrationService, Flash) {
    $scope.degree = degree;
    $scope.currentConcentration = {};

    $scope.concentrationService = concentrationService;
    concentrationService.setup(degree);

    $scope.removeElementFromArray = function(element, array) {
      var index = array.indexOf(element);
      array.splice(index, 1);
    };

    $scope.saveDegree = function() {
      $scope.degree.required_course_ids = $scope.degree.required_courses.map(function(course) {
        return course.id;
      });
      $scope.degree.concentrations_attributes = $scope.degree.concentrations.map(function(concentration) {
        return {
          id: concentration.id,
          degree_id: degree.id,
          name: concentration.name,
          description: concentration.description,
          _destroy: concentration._destroy,
          category_ids: concentration.categories.map(function(category) {
            return category.id;
          }),
        };
      });

      $scope.degree.put().then(function(response) {
        Flash.create("success", "Degree saved.");
      }, function(response) {
        console.warn(response);
        Flash.create("danger", "Degree could not be saved. Consult console for details.");
      });
    };

    $scope.editConcentration = function(concentration) {
      concentrationService.loadConcentration(concentration, $scope);
    };

    $scope.createConcentration = function(name) {
      $scope.addConcentrationVisible = false;
      concentrationService.createConcentration(degree, name).then(function(newConcentration) {
        $scope.degree.concentrations.push(newConcentration);
        $scope.currentConcentration = newConcentration;
        $scope.newConcentrationName = "";
      });
    };

    $scope.deleteConcentration = function(concentration) {
      if (confirm("Are you sure you wish to remove the " + concentration.name + " concentration?")) {
        concentration._destroy = true;
      }
    };

    $scope.saveConcentration = function() {
      concentrationService.save().then(function(response) {
        // find the id of the saved concentration
        var id = response.id;

        // replace the old concentration with the new one
        var oldConcentration = $scope.degree.concentrations.filter(function(concentration) {
          return concentration.id === id;
        })[0];
        var oldConcentrationIndex = $scope.degree.concentrations.indexOf(oldConcentration);
        $scope.degree.concentrations.splice(oldConcentrationIndex, 1, response);
      });
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

  }
]);
