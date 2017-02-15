planner.directive('yearHeader', function() {
  return {
    restrict: "A",
    transclude: true,
    template: "<ng-transclude></ng-transclude>",
    scope: true
  };
});
