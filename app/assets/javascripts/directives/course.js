planner.directive('course', function() {

  var link = function(scope, element, attrs) {
    var length = String(JSON.parse(attrs.sessions).length * 100);
    element.css('width', length +'px');
  };

  return {
    restrict: 'A',
    link: link
  };

});