planner.filter('hideDeleted', function() {
  return function(collection) {
    if (collection == undefined) { return collection; }
    return collection.filter(function(element) { return element._destroy !== true; });
  };
});
