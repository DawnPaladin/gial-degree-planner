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
    exports.current.put();
  };

  return exports;
}]);
