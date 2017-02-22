planner.factory('meetingService', ['Restangular', function(Restangular) {
  
  var get = function(id) {
    return Restangular.one('meetings', id).get();
  };

  var update = function(meeting) {
    return meeting.save();
  };

  return {
    get: get,
    update: update
  };

}]);