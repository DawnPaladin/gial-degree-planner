planner.directive('stickable', ['_', '$window', '$rootScope', function(_, $window, $rootScope) {

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      var stickyItem = element[0];
      var stickyItemTop = stickyItem.getBoundingClientRect().top;
      var elementLeft = stickyItem.getBoundingClientRect().left;
      var elementWidth = stickyItem.offsetWidth;
      var page = document.getElementById('page');
      var stickablePaddingAdd = scope.stickableData.stickablePaddingAdd;

      var stuck = function() {
        var stickyItemHeight = stickyItem.offsetHeight;
        angular.element(stickyItem).addClass('stuck');
        if (scope.stickableData.addPadding) {
          stickablePaddingAdd.setAttribute("style", 'padding-top: ' + stickyItemHeight + 'px;');
        }
        if (scope.stickableData.getWidth) {
          stickyItem.style.width = elementWidth + 'px';
          stickyItem.style.left = elementLeft + 'px';
        }
      };

      var unstuck = function() {
        if (angular.element(stickyItem).hasClass('stuck')) { 
          angular.element(stickyItem).removeClass('stuck'); 
        }
        if (scope.stickableData.addPadding) {
          stickablePaddingAdd.setAttribute("style", 'padding-top: 0px;');
        }
      }

      var stickyStart = function() {
        if (page.scrollTop > stickyItemTop) {
          stuck();
        } else {
          unstuck();
        }
      };

      var throttledStickyStart = _.throttle(stickyStart, 100);

      $window.addEventListener('scroll', throttledStickyStart);

      $rootScope.$on('$stateChangeStart', function() {
        $window.removeEventListener('scroll', throttledStickyStart);
      });    
    }
  }

}]);