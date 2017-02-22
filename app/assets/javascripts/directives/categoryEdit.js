planner.directive('categoryEdit', ['Restangular', '$timeout', 'courseService', 'planService', 'electiveService', function(Restangular, $timeout, courseService, planService, electiveService) {
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
        });
      };

      // scope.deleteCourse = function(course) {
      //   var elective_id = course.elective_id;
      //   electiveService.remove(elective_id)
      //     .then(function(elective) {
      //       if (elective.intended)
      //
      //         scope.planInfo.plan.intended_id = elective.course_id;
      //       if (elective.completed)
      //         scope.planInfo.plan.completed_id = elective.course_id;
      //         planService.update(scope.planInfo.plan, scope.planInfo.plan.latest_registered);
      //     });
      // };

      // show typeahead
      scope.showClassInput = function() {
        scope.addingClass = true;
        $timeout(function() {
          angular.element('.elective-input').focus();
        });
      };

      // hide typeahead
      scope.hideClassInput = function() {
        if (event.relatedTarget === null)
          scope.addingClass = false;
      };

      // utility
      scope.removeElementFromArray = function(element, array) {
        var index = array.indexOf(element);
        array.splice(index, 1);
      };

      // scope.setCourse = function(course) {
      //   course = angular.copy(course, {});
      //   course.category_id = scope.category.id;
      //   scope.category.courses.push(course);
      // };


    }
  };
}]);
