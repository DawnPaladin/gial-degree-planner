planner.controller('DegreeEditCtrl', ['$scope', '$timeout', 'degree', 'courseService', 'concentrationService', 'Flash',
  function($scope, $timeout, degree, courseService, concentrationService, Flash) {
    $scope.degree = degree;
    console.log(degree);
    $scope.currentConcentration = {};

    $scope.concentrationService = concentrationService;
    concentrationService.setup(degree);

    function Concentration() {
      this.name = "";
      this.degree_id = degree.id;
    }
    $scope.newConcentration = new Concentration();

    $scope.removeElementFromArray = function(element, array) {
      var index = array.indexOf(element);
      array.splice(index, 1);
    };

    $scope.saveDegree = function() {
      console.log("Outgoing:", $scope.degree);
      $scope.degree.required_course_ids = $scope.degree.required_courses.map(function(course) {
        return course.id;
      });
      $scope.degree.concentrations_attributes = $scope.degree.concentrations;

      $scope.degree.put().then(function(response) {
        console.log(response);
        Flash.create("success", "Degree saved.");
      }, function(response) {
        console.warn(response);
        Flash.create("danger", "Degree could not be saved. Consult console for details.");
      });
    };

    $scope.editConcentration = function(concentration) {
      concentrationService.loadConcentration(concentration, $scope);
    };

    $scope.createConcentration = function() {
      $scope.degree.concentrations.push($scope.newConcentration);
      $scope.addConcentrationVisible = false;
      $scope.currentConcentration = $scope.newConcentration;
      $scope.newConcentration = new Concentration();
    };

    $scope.deleteConcentration = function(concentration) {
      if (confirm("Are you sure you wish to remove the " + concentration.name + " concentration?")) {
        $scope.removeElementFromArray(concentration, $scope.degree.concentrations);
      }
    };

    $scope.createCategory = function() {
      console.log($scope.currentConcentration.categories);
      $scope.currentConcentration.categories.push({
        concentration_id: $scope.currentConcentration.id,
        courses: [],
        name: "New category",
        required_units: 0
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
