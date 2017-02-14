planner.factory('planService', ['Restangular', function(Restangular) {

  var _planInfo = {};
  
  var getPlanInfo = function() {
    return _planInfo;
  };

  var getPlan = function(student_id) {
    Restangular.one('students', student_id)
      .customGET('plan')
      .then(function(response){
        _planInfo.plan = {};

        _extend(response.intended_courses, 'intended', true);
        _extend(response.completed_courses, 'completed', true);
        console.log(response)

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

  var _extend = function(array, propName, value) {
    array.forEach(function(element) {
      element[propName] = value;
    })
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
    update: update
  };

}]);
