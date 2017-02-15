planner.factory('planService', ['Restangular', 'helpers', function(Restangular, helpers) {

  var _planInfo = {};
  
  var getPlanInfo = function() {
    return _planInfo;
  };

  var getPlan = function(student_id) {
    Restangular.one('students', student_id)
      .customGET('plan')
      .then(function(plan){
        _planInfo.plan = {};
        _planInfo.plan.coursesById = {};
        // console.log(plan);
        
        _extractCourses(plan);
        // console.log(_planInfo.plan.coursesById)


        // helpers.extendArray(plan.required_courses, 'required', true);
        // plan.intended_courses = _zipArrays(plan.required_courses, plan.intended_courses, plan.completed_courses);
        // helpers.extendArray(plan.intended_courses, 'intended', true);
        // helpers.extendArray(plan.completed_courses, 'completed', true);

        angular.copy(plan, _planInfo.plan);
        return _planInfo;
      }, function(error) {
        console.error(error);
      });
  };

  var _extractCourses = function(plan) {
    var required = plan.required_courses;
    var intended = plan.intended_courses;
    var completed = plan.completed_courses;
    plan.coursesById = {};
    
    required.forEach(function(course) {
      if (plan.coursesById[course.id]) {
        plan.coursesById[course.id].required = true;
      } else {
        var savedCourse = angular.copy(course, {});
        savedCourse.required = true;
        plan.coursesById[savedCourse.id] = savedCourse;
      }
    });

    intended.forEach(function(course) {
      if (plan.coursesById[course.id]) {
        plan.coursesById[course.id].intended = true;
      } else {
        var savedCourse = angular.copy(course, {});
        savedCourse.intended = true;
        plan.coursesById[savedCourse.id] = savedCourse;
      }
    });

    completed.forEach(function(course) {
      if (plan.coursesById[course.id]) {
        plan.coursesById[course.id].completed = true;
        // possibly set intended to false, should not be the case, but here we are
      } else {
        var savedCourse = angular.copy(course, {});
        savedCourse.completed = true;
        plan.coursesById[savedCourse.id] = savedCourse;
      }
    });

    if (plan.available_courses) {
      plan.available_courses.forEach(function(category) {
        category.courses.forEach(function(course) {
          if (plan.coursesById[course.id]) {
            plan.coursesById[course.id].category_id = category.id;
          } else {
            course.category_id = category.id;
            var savedCourse = angular.copy(course, {});
            plan.coursesById[savedCourse.id] = savedCourse;
          }
        });
      });
    }

  };

  var _zipArrays = function(additive, addedTo, checkAgainst) {
    var included;
    for (var i = 0; i < additive.length; i++) {
      for (var j = 0; j < addedTo.length; j++) {
        if (additive[i].id === addedTo[j].id) {
          console.log('required', additive[i])
          console.log('intended', addedTo[j])
          included = true;
        } else {

          for (var k = 0; k < checkAgainst.length; k++) {
            if (additive[i].id === checkAgainst[k].id) {
              console.log('required', additive[i])
              console.log('completed', checkAgainst[k])
              included = true;
            }
          }
        }
      }
      if (!included) addedTo.push(additive[i]);
    }
    return addedTo;
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
    var actionOccured;
    if (course.intended) {
      actionOccured = _addToIntended(course);
    } else {
      actionOccured = _removeFromIntended(course);
    }
    
    if (course.required) return;
    if (actionOccured) {
      _planInfo.plan.intended_id = course.id;
      update(_planInfo.plan);
    }
  };

  var addOrRemoveCompleted = function(course) {
    var actionOccured;
    if (course.completed) {
      actionOccured = _addToCompleted(course);
    } else {
      actionOccured = _removeFromCompleted(course);
    }

    if (actionOccured) {
      _planInfo.plan.completed_id = course.id;
      update(_planInfo.plan);
    }
  };


  // TODO if these remain unchanged
  // refactor into two functions
  var _addToIntended = function(course) {
    // console.log('in intended', _planInfo.plan.intended_courses.includes(course))
    // console.log('in completed', _planInfo.plan.completed_courses.includes(course))
    if (_planInfo.plan.intended_courses.includes(course)
        || _planInfo.plan.completed_courses.includes(course)) {
      return false;
    }
    // Restangular.restangularizeElement(_planInfo.plan, course, 'courses');
    // console.log('here')
    _planInfo.plan.intended_courses.push(course);
    return true;
  };

  var _addToCompleted = function(course) {
    // Restangular.restangularizeElement(_planInfo.plan, course, 'courses');
    if (!_planInfo.plan.completed_courses.includes(course)) {
      _planInfo.plan.completed_courses.push(course);
      return true;
    }
    return false;
  };

  var _removeFromIntended = function(course) {
    for (var i = 0; i < _planInfo.plan.intended_courses.length; i++) {
      if (_planInfo.plan.intended_courses[i].id === course.id) {
        _planInfo.plan.intended_courses.splice(i, 1);
        return true;
      }
    }
    return false;
  };

  var _removeFromCompleted = function(course) {
    for (var i = 0; i < _planInfo.plan.completed_courses.length; i++) {
      if (_planInfo.plan.completed_courses[i].id === course.id) {
        _planInfo.plan.completed_courses.splice(i, 1);
        return true;
      }
    }
    return false;
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
