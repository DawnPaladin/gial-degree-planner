planner.factory('concentrationService', ['Restangular', function(Restangular) {
  var exports = {};

  exports.setup = function(aDegree) {
    exports.degree = aDegree;
  };

  exports.loadConcentration = function(concentration) {
    Restangular.restangularizeElement(null, concentration, 'concentrations');
    exports.current = concentration;
    concentration.has_thesis_track = !!concentration.thesis_track;
  };

  exports.save = function() {
    console.log(exports.current);
    exports.current.categories_attributes = exports.current.categories
    exports.current.put();
  };

  exports.createCategory = function() {
    console.log(exports.current.categories);
    exports.current.categories.push({
      concentration_id: exports.current.id,
      courses: [],
      name: "New category",
      required_units: 0
    });
  };

  return exports;
}]);
