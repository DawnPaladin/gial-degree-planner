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

      console.log(response)

        angular.copy(response, _planInfo);
        return _planInfo;
      }, function(error) {
        console.error(error);
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
    getPlan: getPlan
  };


}]);