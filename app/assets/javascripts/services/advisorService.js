planner.factory('advisorService', ['Restangular', function(Restangular) {

  var getAll = function() {
    return Restangular.all('advisors').getList();    
  };

  return {
    getAll: getAll
  };

}]);