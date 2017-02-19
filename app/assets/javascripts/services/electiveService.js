planner.factory('electiveService', ['Restangular', function(Restangular) {
  
  var update = function(course) {
    var params = {
      id: course.elective_id,
      course_id: course.id,
      intended: course.intended,
      completed: course.completed
    };
    var elective = Restangular.restangularizeElement(null, params, 'electives');
    elective.put();
    // return Restangular.one('electives', course.elective_id).put({elective: params})
  };

  return {
    update: update
  }
}]);