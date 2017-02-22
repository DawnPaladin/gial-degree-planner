planner.factory('sessionService', ['Restangular', function(Restangular) {

  var _sessions = [];

  var returnSessions = function() {
    return _sessions;
  };

  var getSessions = function() {
    return Restangular.all('sessions').getList().then(function(sessions) {
      angular.copy(sessions, _sessions);
      return sessions;
    });    
  };

  return {
    getSessions: getSessions,
    returnSessions: returnSessions
  };

}]);