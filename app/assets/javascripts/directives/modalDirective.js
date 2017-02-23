planner.directive('modal', [function() {

  return {
    restrict: 'E',
    scope: {
      category: '@',
      onSave: '&'
    },
    templateUrl: '/directives/modal.html',
    transclude: {
      title: '?modalTitle',
      body: 'modalBody'
    },
    replace: true
  };

}]);