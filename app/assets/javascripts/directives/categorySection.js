planner.directive('categorySection', ['Restangular', '$timeout', 'courseService', 'planService', 'electiveService', function(Restangular, $timeout, courseService, planService, electiveService) {
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

        electiveService.create(electiveParams)
          .then(function(response) {
            planService.update(scope.planInfo.plan, scope.planInfo.plan.latest_registered);
          });
      };

      scope.deleteElective = function(course) {
        var elective_id = course.elective_id;
        electiveService.remove(elective_id)
          .then(function(elective) {
            if (elective.intended)
              scope.planInfo.plan.intended_id = elective.course_id
            if (elective.completed)
              scope.planInfo.plan.completed_id = elective.course_id
            planService.update(scope.planInfo.plan, scope.planInfo.plan.latest_registered);
          });
      }

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