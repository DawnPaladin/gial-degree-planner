planner.factory('concentrationService',
  ['Restangular', function(Restangular) {
  
  var getConcentration = function(concentrationId) {
    console.log('here')
    return Restangular.one('concentrations', concentrationId)
      .get()
      .$object;
  };

  return {
    getConcentration: getConcentration
  };
}]);