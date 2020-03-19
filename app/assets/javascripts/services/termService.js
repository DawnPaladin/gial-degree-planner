planner.factory('termService', ['Restangular', function(Restangular) {

  var _terms = [];

  var returnTerms = function() {
    return _terms;
  };

  var getTerms = function() {
    return Restangular.all('terms').getList().then(function(terms) {
      angular.copy(terms, _terms);
      return terms;
    });    
  };

  return {
    getTerms: getTerms,
    returnTerms: returnTerms
  };

}]);
