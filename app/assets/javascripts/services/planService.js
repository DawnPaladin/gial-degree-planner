planner.factory('planService', ['Restangular', 'helpers', function(Restangular, helpers) {

  var _planInfo = {}
  
  var getPlanInfo = function() {
    return _planInfo;
  };

  var getPlan = function(student_id) {
    Restangular.one('students', student_id)
      .customGET('plan')
      .then(function(plan){
        _planInfo.plan = {};
        
        plan.intended_courses = Restangular.restangularizeCollection(plan, plan.intended_courses, 'courses')
        plan.courses = Restangular.restangularizeCollection(plan, plan.completed_courses, 'courses')
        helpers.extendArray(plan.intended_courses, 'intended', true);
        helpers.extendArray(plan.completed_courses, 'completed', true);

        angular.copy(plan, _planInfo.plan);
        console.log(_planInfo.plan)
        return _planInfo;
      }, function(error) {
        console.error(error);
      });
  };

  var update = function(plan) {
    return Restangular.one('students', plan.student_id)
      .customPUT(plan, 'plan')
      .then(function(plan) {
        plan.completed_id = null;
        plan.intended_id = null;
        return plan;
    }, function(response) {
      console.error(response);
    });
  };

  var addOrRemoveIntended = function(course) {
    if (course.intended) {
      _addToIntended(course);
    } else {
      _removeFromIntended(course);
    }
    _planInfo.plan.intended_id = course.id;
    update(_planInfo.plan);
  }

  var addOrRemoveCompleted = function(course) {
    if (course.completed) {
      _addToCompleted(course);
    } else {
      _removeFromCompleted(course);
    }
    _planInfo.plan.completed_id = course.id;
    update(_planInfo.plan);
  };


  // TODO if these remain unchanged
  // refactor into two functions
  var _addToIntended = function(course) {
    Restangular.restangularizeElement(_planInfo.plan, course, 'courses');
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
        _planInfo.plan.completed_courses[i].remove()
          .then(function() {
            _planInfo.plan.save();
          });
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
