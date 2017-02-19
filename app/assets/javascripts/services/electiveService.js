planner.factory('electiveService', ['Restangular', function(Restangular) {
  
  var update = function(course) {
    var params = {
      id: course.elective_id,
      course_id: course.id,
      intended: course.intended,
      completed: course.completed
    };
    var elective = Restangular.restangularizeElement(null, params, 'electives');
    return elective.put();
  };

  var create = function(params) {
    return Restangular.all('electives')
      .post({ elective: params });
  };

  var remove = function(id) {
    return Restangular.one('electives', id).remove();
  };

  return {
    update: update,
    create: create,
    remove: remove
  }
}]);