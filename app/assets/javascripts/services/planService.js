planner.factory('planService', ['Restangular', 'helpers', '_', function(Restangular, helpers, _) {

  var _planInfo = {};
  
  var getPlanInfo = function() {
    return _planInfo;
  };

  var getPlan = function(student_id) {
    return Restangular.one('students', student_id)
      .customGET('plan')
      .then(function(plan){
        _planInfo.plan = {};
        _planInfo.plan.coursesById = {};
        
        _extractCourses(plan);
        _initializeCourses(plan);

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
    

    if (plan.available_courses) {
      plan.available_courses.forEach(function(category) {
        category.courses.forEach(function(course) {
          course.category_id = category.id;
          plan.coursesById[course.id] = course;
        });
      });
    }
    

    required.forEach(function(course) {
      if (plan.coursesById[course.id]) {
        plan.coursesById[course.id].required = true;
        plan.coursesById[course.id].intended = true;
      } else {
        var savedCourse = angular.copy(course, {});
        savedCourse.required = true;
        savedCourse.intended = true;
        plan.coursesById[savedCourse.id] = savedCourse;
      }
    });

    intended.forEach(function(course) {
      if (plan.coursesById[course.id]) {
        plan.coursesById[course.id].intended = true;
      } else {
        // var savedCourse = angular.copy(course, {});
        course.intended = true;
        plan.coursesById[course.id] = course;
      }
    });

    completed.forEach(function(course) {
      if (plan.coursesById[course.id]) {
        plan.coursesById[course.id].completed = true;
        plan.coursesById[course.id].intended = false;
        // possibly set intended to false, should not be the case, but here we are
      } else {
        var savedCourse = angular.copy(course, {});
        savedCourse.completed = true;
        plan.coursesById[savedCourse.id] = savedCourse;
      }
    });


  };

  var _initializeCourses = function(plan) {
    plan.intended_courses = _.filter(_.values(plan.coursesById), function(course) {
      return course.intended === true;
    });
    plan.required_courses = _.filter(_.values(plan.coursesById), function(course) {
      return course.required === true;
    });
    plan.completed_courses = _.filter(_.values(plan.coursesById), function(course) {
      return course.completed === true;
    });
  };



  var update = function(plan) {
    return Restangular.one('students', plan.student_id)
      .customPUT(plan, 'plan')
      .then(function(plan) {
        console.log('here')
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
  };

  var addOrRemoveCompleted = function(course) {

    if (course.completed) {
      _addToCompleted(course);
    } else {
      _removeFromCompleted(course);
    }

    _planInfo.plan.completed_id = course.id;

    // Do this because intended must be toggled
    // But this way only one update call
    addOrRemoveIntended(course);
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
