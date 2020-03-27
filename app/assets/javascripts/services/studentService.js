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
  
  var saveStudent = function(student) {
    return Restangular.one('students', student.id).patch(student);
  }

  return {
    getAll: getAll,
    getUnarchived: getUnarchived,
    getArchived: getArchived,
    saveStudent: saveStudent,
  };

}]);
