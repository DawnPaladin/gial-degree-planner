planner.directive('categoryEdit', ['Restangular', '$timeout', 'courseService', 'planService', 'electiveService', 'concentrationService', function(Restangular, $timeout, courseService, planService, electiveService, concentrationService) {
  return {
    restrict: 'E',
    templateUrl: '/directives/category-edit.html',
    scope: {
      category: '=',
    },
    link: function(scope) {

      // populate "Add a course" typeahead
      courseService.getCourses().then(function(courses) {
        scope.availableElectives =  courses.map(function(course) {
          return {
            id: course.id,
            name: course.number + ' ' + course.name,
            units: course.units
          };
        });
      });

      // fired on typeahead selection
      scope.addCourse = function(misnamedCourse) {
        courseService.getCourses().then(function(courses) {
          var course = courses.filter(function(obj) {
            return obj.id === misnamedCourse.id;
          })[0];
          scope.category.courses.push(course);
          scope.hideClassInput(true);
        });
      };

      // show typeahead
      scope.showClassInput = function() {
        scope.addingClass = true;
        $timeout(function() {
          angular.element('.elective-input').focus();
        });
      };

      // hide typeahead
      scope.hideClassInput = function(override) {
        if ((event && event.relatedTarget === null) || override === true) {
          $timeout(function() { scope.addingClass = false; });
        }
      };

      // utility
      scope.removeElementFromArray = function(element, array) {
        var index = array.indexOf(element);
        array.splice(index, 1);
      };

      scope.concentrationService = concentrationService;

    }
  };
}]);
