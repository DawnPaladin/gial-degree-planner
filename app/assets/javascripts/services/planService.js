planner.factory('planService', ['Restangular', function(Restangular) {

  var _planInfo = {};
  // _planInfo.completedCourses = [];
  // _planInfo.intendedCourses = [];
  // _planInfo.scheduledCourses = [];
  
  var getPlanInfo = function() {
    return _planInfo;
  };

  var getPlan = function(student_id) {
    Restangular.one('students', student_id)
      .customGET('plan')
      .then(function(response){
        _planInfo.plan = {};
        angular.copy(response, _planInfo.plan);
        return _planInfo;
      }, function(error) {
        console.error(error);
      });
  };

  var update = function(plan) {
    return Restangular.one('students', plan.student_id).customPUT(plan, 'plan').then(function(plan) {
      return plan;
    }, function(response) {
      console.error(response);
    });
  };

  // TODO Refactor
  var updateSchedule = function(data) {
    return Restangular.one('students', _planInfo.plan.student_id).customPUT(_planInfo.plan, "update_schedule", data ).then(function(response) {
        return response;
    }, function(response) {
      console.error(response);
    });
  };

  var _populateYears = function() {  
    _planInfo.possibleYears = [];
    var currentYear = new Date().getFullYear();
    for (var i = 0; i < 10; i++) {
      var year = currentYear + i;
      _planInfo.possibleYears.push(year);
    }
  };
  _populateYears();

  return {
    getPlanInfo: getPlanInfo,
    getPlan: getPlan,
    update: update,
    updateSchedule: updateSchedule
  };

}]);
