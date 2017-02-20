planner.factory('courseService', ['Restangular', '$q', function(Restangular, $q) {
  
  var _courses = [];

  var getCourses = function() {
    if (_courses.length) { return $q.when(_courses); }
    else { return _fetchCourses(); }
  };

  var create = function(params) {
    return Restangular.all('courses')
      .post(params)
      .then(function(course) {
        return course;
      });
  };

  var _fetchCourses = function() {
    return Restangular.all('courses').getList()
      .then(function(courses) {
        angular.copy(courses, _courses);
        return _courses;
      });
  };
  
  return {
    getCourses: getCourses,
    create: create
  };

}]);