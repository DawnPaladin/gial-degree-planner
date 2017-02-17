planner.directive('categorySection', ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    templateUrl: '/directives/category-section.html',
    scope: true,
    link: function(scope) {
      scope.addingClass = false;

      scope.showClassInput = function() {
        scope.addingClass = true;
        $timeout(function() {
          angular.element('.elective-input').focus();
        });
      };

      scope.hideClassInput = function() {
        scope.addingClass = false;
      };
    }
  };
}]);