planner.factory('planService', ['Restangular', '_', 'electiveService', function(Restangular, _, electiveService) {

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
        
        if (plan.available_courses) _extendCategories(plan);
        _extractCourses(plan);
        _initializeCourses(plan);

        angular.copy(plan, _planInfo.plan);

        return _planInfo;
      }, function(error) {
        console.error(error);
      });
  };

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
  var updateSchedule = function(data) {
    return Restangular.one('students', _planInfo.plan.student_id).customPUT(_planInfo.plan, "update_schedule", data ).then(function(response) {
        return response;
    }, function(response) {
      console.error(response);
    });
  };

  // used in callbacks
  var addOrRemoveIntended = function(course) {
    // Update the elective resource to reflect intended/completedness
    if (course.elective) {
      electiveService.update(course);
    } else {
      // Rails controller configured to take intended_id
      // and add or remove association conditionally
      _planInfo.plan.intended_id = course.id;
    }
    update(_planInfo.plan);
  };

  var addOrRemoveCompleted = function(course) {
    if (!course.elective) {
      // rails controller configured to take completed_id
      // and add or remove association conditionally
      _planInfo.plan.completed_id = course.id;
    }

    // Do this because intended must be toggled every time completed is
    // this way there's only one update call
    addOrRemoveIntended(course);
  };


  /*
   * Utility, private, etc
   *
   */
  

  // Makes data from backend useful for front
  var _extractCourses = function(plan) {

    var required = plan.required_courses;
    var intended = plan.intended_courses;
    var completed = plan.completed_courses;
    var scheduled = plan.scheduled_classes;

    plan.coursesById = {};
    
    // available_courses are present if
    // a concentration has been set
    // populate coursesById
    if (plan.available_courses) _extractAvailableCourses(plan);
    if (plan.non_thesis_track) _createNonThesisCategory(plan);
    if (plan.thesis_track) {
      _extractThesisCourses(plan);
      _createThesisCategory(plan);
    }

    // Place elective_courses into correct category
    // NOTE: While other courses get extracted into coursesById
    // Electives are extracted straight into availableCourses
    if (plan.elective_courses) _extractElectives(plan);

    // Go through coursesById and set the correct ones
    // to required, intended, completed within coursesById
    required.forEach(_markOrCreateRequired, plan);  
    intended.forEach(_markOrCreateIntended, plan);
    completed.forEach(_markOrCreateCompleted, plan);
    scheduled.forEach(_markOrCreateScheduled, plan);
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
    
    plan.completed_courses = _.filter(_.values(plan.coursesById), function(course) {
      return course.completed === true;
    });

    if (plan.elective_courses) {
      _insertElectives(plan.elective_courses, plan.intended_courses, 'intended');
      _insertElectives(plan.elective_courses, plan.completed_courses, 'completed');
    }
  };

  // Push electives onto the lists to be rendered
  var _insertElectives = function(elective_courses, courses, property) {
    var filtered_electives = _.filter(elective_courses, function(course) {
      return course[property];
    });
    angular.copy(courses.concat(filtered_electives), courses);
  };

  
  // TODO Refactor
  var enrollInMeeting = function(data) {

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

  var _extractAvailableCourses = function(plan) {
    plan.available_courses.forEach(function(category) {
      category.courses.forEach(function(course) {
        course.category_id = category.id;
        plan.coursesById[course.id] = course;
      });
    });
  };

  var _extractThesisCourses = function(plan) {
    var thesis = plan.thesis_track;
    thesis.courses.forEach(function(course) {
      course.category_id = 'thesis';
      plan.coursesById[course.id] = course;
    });

  };

  var _createThesisCategory = function(plan) {
    var thesis = plan.thesis_track;
    var additionalParams = {
      name: 'Thesis Track',
      required_units: thesis.elective_hours + thesis.thesis_hours,
      id: 'thesis'
    };
    Object.assign(thesis, additionalParams);
    plan.available_courses.push(thesis);
  };

  var _createNonThesisCategory = function(plan) {
    var additionalParams = {
      name: 'Non-Thesis Track',
      required_units: plan.non_thesis_track.elective_hours,
      id: 'non_thesis',
      courses: []
    };
    Object.assign(plan.non_thesis_track, additionalParams);
    plan.available_courses.push(plan.non_thesis_track);
  };

  var _extractElectives = function(plan) {
    plan.elective_courses.forEach(function(course) {
      course.elective = true;
      for (var i = 0; i < plan.available_courses.length; i++) {
        if (plan.available_courses[i].name === course.category_name){
          course.category_id = plan.available_courses[i].id;
          plan.available_courses[i].courses.push(course);
        }
      }
    });
  };

  var _markOrCreateRequired = function(course) {
    // `this` is the plan obj
    if (this.coursesById[course.id]) {
      this.coursesById[course.id].required = true;
      this.coursesById[course.id].intended = true;
    } else {
      course.required = true;
      course.intended = true;
      this.coursesById[course.id] = course;
    }
  };

  var _markOrCreateIntended = function(course) {
    // `this` is the plan obj
    if (this.coursesById[course.id]) {
      this.coursesById[course.id].intended = true;
    } else {
      course.intended = true;
      this.coursesById[course.id] = course;
    }
  };

  var _markOrCreateCompleted =function(course) {
    // `this` is the plan obj
    if (this.coursesById[course.id]) {
      this.coursesById[course.id].completed = true;
      this.coursesById[course.id].intended = false;
    } else {
      course.completed = true;
      this.coursesById[course.id] = course;
    }
  };
    
  var _markOrCreateScheduled = function(course) {
    // `this` is the plan obj
    if (plan.coursesById[course.id]) {
      plan.coursesById[course.id].scheduled = true;
    } else {
      course.scheduled = true;
      plan.coursesById[course.id] = course;
    }
  }

  // Add functions to category to calculate
  // how many of its requried units are satisfied
  // based on intended and completed courses
  var _extendCategories = function(plan) {
    plan.available_courses.forEach(function(category) {
      category.sumCompletedUnits = function() {
        var sum = 0;
        for (var i = 0; i < this.courses.length; i++) {
          if (!!this.courses[i].completed) {
            sum += this.courses[i].units;
          }
        }
        return sum;
      };

      category.sumIntendedUnits = function() {
        var sum = 0;
        for (var i = 0; i < this.courses.length; i++) {
          if (!!this.courses[i].intended) {
            sum += this.courses[i].units;
          }
        }
        return sum;
      };

      category.sumPlannedUnits = function() {
        return this.sumCompletedUnits() + this.sumIntendedUnits();
      };

      category.satisfiedByCompleted = function() {
        return this.sumCompletedUnits() >= this.required_units;
      };

      category.satisfiedByIntended = function() {
        return this.sumPlannedUnits() >= this.required_units;
      };
    });
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
