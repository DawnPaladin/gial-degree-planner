planner.directive('categorySection', ['Restangular', '$timeout', 'courseService', function(Restangular, $timeout, courseService) {
  return {
    restrict: 'E',
    templateUrl: '/directives/category-section.html',
    scope: true,
    link: function(scope) {

      courseService.getCourses().then(function(courses) {
        scope.availableElectives =  courses.map(function(course) {
          return {
            id: course.id,
            name: course.number + ' ' + course.name,
            units: course.units
          };
        });
      });

      scope.addElective = function(course) {
        var electiveParams = {
          category_name: scope.category.name,
          course_id: course.id,
          plan_id: scope.planInfo.plan.id
        };

        Restangular.all('electives')
          .post(electiveParams).then(function(response) {
            console.log('posted. got:', response);
          });
      };

      scope.showClassInput = function() {
        scope.addingClass = true;
        $timeout(function() {
          angular.element('.elective-input').focus();
        });
      };

      scope.hideClassInput = function() {
        // scope.addingClass = false;
      };

      scope.setCourse = function(course) {
        course = angular.copy(course, {});
        course.category_id = scope.category.id;
        scope.category.courses.push(course);
      };

    }
  };
}]);