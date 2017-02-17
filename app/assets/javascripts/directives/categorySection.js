planner.directive('categorySection', ['$timeout', 'Restangular', function($timeout, Restangular) {
  return {
    restrict: 'E',
    templateUrl: '/directives/category-section.html',
    scope: true,
    link: function(scope) {

      // var _courses;

      Restangular.all('courses').getList()
        .then(function(courses) {
          scope.availableElectives = courses
          .map(function(course) {
            return {
              id: course.id,
              name: course.number + ' ' + course.name,
              units: course.units
            };
          });
        });

      scope.showClassInput = function() {
        scope.addingClass = true;
        $timeout(function() {
          angular.element('.elective-input').focus();
        });
      };

      scope.hideClassInput = function() {
        scope.addingClass = false;
      };

      scope.setCourse = function(course) {
        course = angular.copy(course, {});
        course.category_id = scope.category.id;
        scope.category.courses.push(course);
      };

    }
  };
}]);