planner.factory('meetingService', ['Restangular', function(Restangular) {
  
  var get = function(id) {
    return Restangular.one('meetings', id).get();
  };

  return {
    get: get
  };

}]);