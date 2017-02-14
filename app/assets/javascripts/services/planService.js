planner.factory('planService', ['Restangular', 'helpers', function(Restangular, helpers) {

  var _planInfo = {}
  
  var getPlanInfo = function() {
    return _planInfo;
  };

  var getPlan = function(student_id) {
    Restangular.one('students', student_id)
      .customGET('plan')
      .then(function(response){
        _planInfo.plan = {};

        helpers.extendArray(response.intended_courses, 'intended', true);
        helpers.extendArray(response.completed_courses, 'completed', true);

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

  var addToIntended = function(course) {
    _planInfo.plan.intended_courses.push(course);
  }

  // populates years in the graduation year dropdown
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
    addToIntended: addToIntended
  };

}]);
