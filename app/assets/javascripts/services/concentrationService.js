planner.factory('concentrationService',
  ['Restangular', 'helpers', function(Restangular, helpers) {
  
  var getConcentration = function(concentrationId) {
    if (!concentrationId) {
      return _nullConcentration;
    }
    return Restangular.one('concentrations', concentrationId)
      .get()
      .$object
  };

  var _nullConcentration = {
    categories: [{
      name: 'New Plan',
      courses: [{
        name: 'Please select a concentration above.',
        number: 'AA0000'
      }]
    }],
    required: true
  }

  return {
    getConcentration: getConcentration
  };
}]);
