planner.factory('concentrationService',
  ['Restangular', 'helpers', function(Restangular, helpers) {
  
  var getConcentration = function(concentrationId) {
    return Restangular.one('concentrations', concentrationId)
      .get()
      .$object
  };

  return {
    getConcentration: getConcentration
  };
}]);
