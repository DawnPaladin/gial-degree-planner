planner.factory('planService', ['Restangular', '_', function(Restangular, _) {

  var _planInfo = {};
  
  // This is called once from HeaderCtrl
  // Would be better to use the IPS resolve,
  // but changing it to do so,
  // references were lost
  // TODO: investigate
  var getPlanInfo = function() {
    return _planInfo;
  };

  // This is called in the IPS resolve
  // should probably be renamed to getplaninfo,
  // but let's merge up first
  var getPlan = function(student_id) {
    return Restangular.one('students', student_id)
      .customGET('plan')
      .then(function(plan){
        _planInfo.plan = {};
        _planInfo.plan.coursesById = {};
        
        _extendCategories(plan);
        _extractCourses(plan);
        _initializeCourses(plan);

        angular.copy(plan, _planInfo.plan);

        return _planInfo;
      }, function(error) {
        console.error(error);
      });
  };

  var _extendCategories = function(plan) {
    if (!plan.available_courses) return;

    plan.available_courses.forEach(function(category) {
      category.sumCompletedUnits = function() {
        var sum = 0;
        for (i = 0; i < this.courses.length; i++) {
          if (!!this.courses[i].completed) {
            sum += this.courses[i].units;
          }
        }
        return sum;
      };

      category.sumIntendedUnits = function() {
        var sum = 0;
        for (i = 0; i < this.courses.length; i++) {
          if (!!this.courses[i].intended) {
            sum += this.courses[i].units;
          }
        }
        return sum;
      };

      category.sumPlannedUnits = function() {
        return this.sumCompletedUnits() + this.sumIntendedUnits();
      }

      category.satisfiedByCompleted = function() {
        return this.sumCompletedUnits() >= this.required_units;
      }

      category.satisfiedByIntended = function() {
        return this.sumPlannedUnits() >= this.required_units;
      }
    });
  }

  // Makes data from backend useful for front
  // TODO: refactor into separate functions
  var _extractCourses = function(plan) {
    var required = plan.required_courses;
    var intended = plan.intended_courses;
    var completed = plan.completed_courses;
    var scheduled = plan.scheduled_classes;
    plan.coursesById = {};
    
    // available_courses are present if
    // a concentration has been set
    // if it exists, populate the all-knowing coursesById
    if (plan.available_courses) {
      plan.available_courses.forEach(function(category) {
        category.courses.forEach(function(course) {
          course.category_id = category.id;
          plan.coursesById[course.id] = course;
        });
      });
    }
    
    // Go through coursesById and set the correct ones
    // to required
    // If a course by the same name is
    // not already there, make one
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
    
    // same for intended courses
    intended.forEach(function(course) {
      if (plan.coursesById[course.id]) {
        plan.coursesById[course.id].intended = true;
      } else {
        course.intended = true;
        plan.coursesById[course.id] = course;
      }
    });

    // same for scheduled courses
    scheduled.forEach(function(course) {
      if (plan.coursesById[course.id]) {
        plan.coursesById[course.id].scheduled = true;
      } else {
        course.scheduled = true;
        plan.coursesById[course.id] = course;
      }
    });

    // same for completed courses
    completed.forEach(function(course) {
      if (plan.coursesById[course.id]) {
        plan.coursesById[course.id].completed = true;
        plan.coursesById[course.id].intended = false;
      } else {
        var savedCourse = angular.copy(course, {});
        savedCourse.completed = true;
        plan.coursesById[savedCourse.id] = savedCourse;
      }
    });
  };


  // This sets the course grouping that are used on screen
  // Doing this like so ensures the courses in coursesById
  // and the courses in these groupings are the same references
  var _initializeCourses = function(plan) {
    plan.intended_courses = _.filter(_.values(plan.coursesById), function(course) {
      return course.intended === true;
    });
    plan.required_courses = _.filter(_.values(plan.coursesById), function(course) {
      return course.required === true;
    });
    plan.scheduled_classes = _.filter(_.values(plan.coursesById), function(scheduled_class) {
      return scheduled_class.completed === true;
    });
    plan.completed_courses = _.filter(_.values(plan.coursesById), function(course) {
      return course.completed === true;
    });
  };


  // is update function
  // refactor to pass in registration info
  // to avoid double updates
  var update = function(plan, latestRegistered) {
    plan.latest_registered = !!latestRegistered;
    return Restangular.one('students', plan.student_id)
      .customPUT(plan, 'plan')
      .then(function(plan) {
        _extendCategories(plan);
        _extractCourses(plan);
        _initializeCourses(plan);
        angular.copy(plan, _planInfo.plan);

        return _planInfo;

    }, function(response) {
      console.error(response);
    });
  };

  // TODO Refactor
  var enrollInMeeting = function(data) {
    return false;
    return Restangular.one('students', _planInfo.plan.student_id).customPUT(_planInfo.plan, "enroll_in_meeting", data ).then(function(plan) {
        _extendCategories(plan);
        _extractCourses(plan);
        _initializeCourses(plan);
        angular.copy(plan, _planInfo.plan);
        return _planInfo;
    }, function(response) {
      console.error(response);
    });
  };

  var disenrollFromMeeting = function(data) {
    return Restangular.one('students', _planInfo.plan.student_id).customPUT(_planInfo.plan, "disenroll_from_meeting", data ).then(function(plan) {
        _extendCategories(plan);
        _extractCourses(plan);
        _initializeCourses(plan);
        angular.copy(plan, _planInfo.plan);
        return _planInfo;
    }, function(response) {
      console.error(response);
    });    
  };

  // used in callbacks
  var addOrRemoveIntended = function(course) {
    if (course.intended) {
      _addToIntended(course);
    } else {
      _removeFromIntended(course);
    }

    // rails controller configured to take intended_id
    // and add or remove association conditionally
    _planInfo.plan.intended_id = course.id;
    update(_planInfo.plan);
  };

  var addOrRemoveCompleted = function(course) {
    if (course.completed) {
      _addToCompleted(course);
    } else {
      _removeFromCompleted(course);
    }
    
    // rails controller configured to take completed_id
    // and add or remove association conditionally
    _planInfo.plan.completed_id = course.id;

    // Do this because intended must be toggled
    // every time completed is
    // this way there's only one update call
    addOrRemoveIntended(course);
  };


  // NOTE: these are purely front-end functions.
  // I tried to get this to work as Restangular collections..
  // but here we are
  // completed/intended_courses are rendered visually
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
    enrollInMeeting: enrollInMeeting,
    disenrollFromMeeting: disenrollFromMeeting,
    addOrRemoveIntended: addOrRemoveIntended,
    addOrRemoveCompleted: addOrRemoveCompleted
  };

}]);
