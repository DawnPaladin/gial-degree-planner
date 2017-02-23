planner.filter('hideDeleted', function() {
  return function(collection) {
    return collection.filter(function(element) { return element._destroy !== true; });
  };
})
