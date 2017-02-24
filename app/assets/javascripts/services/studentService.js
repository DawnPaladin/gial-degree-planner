planner.factory('studentService', ['Restangular', function(Restangular) {

  var getAll = function() {
    return Restangular.all('students').getList();    
  };

  return {
    getAll: getAll
  };

}]);