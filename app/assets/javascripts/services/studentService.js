planner.factory('studentService', ['Restangular', function(Restangular) {

  var getAll = function() {
    return Restangular.all('students').getList();
  };

  var getUnarchived = function() {
    return Restangular.all('students').customGETLIST('', { archived: false });
  };

  var getArchived = function() {
    return Restangular.all('students').customGETLIST('', { archived: true });
  };

  return {
    getAll: getAll,
    getUnarchived: getUnarchived,
    getArchived: getArchived,
  };

}]);
