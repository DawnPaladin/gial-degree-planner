planner.factory('helpers', ['Restangular', function(Restangular) {

  var extendArray = function(array, propName, value) {
    array.forEach(function(element) {
      element[propName] = value;
    })
  }

  return {
    extendArray: extendArray
  }

}])