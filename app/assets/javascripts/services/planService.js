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

  var addOrRemoveIntended = function(course) {
    if (course.intended) {
      console.log('adding to intended')
      _addToIntended(course);
    } else {
      console.log('removing from intended')
      _removeFromIntended(course);
    }
  }

  var addOrRemoveCompleted = function(course) {
    if (course.completed) {
      console.log('adding to completed')
      _addToCompleted(course);
    } else {
      console.log('removing from completed')
      _removeFromCompleted(course);
    }
  };


  // TODO if these remain unchanged
  // refactor into two functions
  var _addToIntended = function(course) {
    _planInfo.plan.intended_courses.push(course);
  };

  var _addToCompleted = function(course) {
    _planInfo.plan.completed_courses.push(course);
  };

  var _removeFromIntended = function(course) {
    for (var i = 0; i < _planInfo.plan.intended_courses.length; i++) {
      if (_planInfo.plan.intended_courses[i].id === course.id) {
        _planInfo.plan.intended_courses.splice(i, 1);
      }
    }
  };

  var _removeFromCompleted = function(course) {
    for (var i = 0; i < _planInfo.plan.completed_courses.length; i++) {
      if (_planInfo.plan.completed_courses[i].id === course.id) {
        _planInfo.plan.completed_courses.splice(i, 1);
      }
    }
  };


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
    addOrRemoveIntended: addOrRemoveIntended,
    addOrRemoveCompleted: addOrRemoveCompleted
  };

}]);
