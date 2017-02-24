planner.factory('meetingService', ['Restangular', function(Restangular) {
  
  var getAll = function() {
    return Restangular.all('courses').getList();
  };

  var get = function(id) {
    return Restangular.one('meetings', id).get();
  };

  var update = function(meeting) {
    return meeting.save();
  };

  return {
    get: get,
    update: update,
    getAll: getAll
  };

}]);