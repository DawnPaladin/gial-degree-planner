planner.factory('courseService', ['Restangular', '$q', '_', 'Flash', function(Restangular, $q, _, Flash) {

  var _courses = [];

  var getCourses = function() {
    if (_courses.length) { return $q.when(_courses); }
    else { return _fetchCourses(); }
  };

  var setCourses = function(courses) {
    _courses = courses;
  };

  var create = function(params) {
    return Restangular.all('courses')
      .post(params)
      .then(function(course) {
        _getCourseAttendance(course);
        _courses.push(course);
        Flash.create("success", "Course created");
        return course;
      }, function(error) {
        Flash.create("danger", "Course could not be created. See console for details.");
        console.error(error);
      });
  };

  var update = function(course) {
    course = Restangular.restangularizeElement(null, course, 'courses');
    return course.put()
      .then(function(updatedCourse){
        var oldCourse = _.findWhere(_courses, { id: updatedCourse.id });
        angular.copy(updatedCourse, oldCourse);
        oldCourse.session_ids = oldCourse.sessions.map(function(session) {
          return session.id;
        });
        _getCourseAttendance(oldCourse);
        Flash.create("success", "Course updated");
        return oldCourse;
      }, function(error) {
        Flash.create("danger", "Course could not be updated. See console for details.");
        console.error(error);
      });
  };

  var countOfForeignCourses = function() {
    return getCourses()
      .then(function(courses) {
        return courses.reduce(function(count, course) {
          return !course.local ? count += 1 : count;
        }, 0);
      })
  };

  var _getCourseAttendance = function(course) {
    var years = ["2017", "2018", "2019", "2020"];
    var meetings = [];
    meetings.push.apply(meetings, course.meetings);
    course.attendance = [];
    years.forEach(function(year) {
      var yearAttendance = {
        spring: {},
        summer: {},
        fall: {},
        any: {},
      };
      // find the course meeting for this year
      var thisYearsMeeting = course.meetings.filter(function(meeting) { return meeting.year === Number(year); })[0];
      var term = thisYearsMeeting.term.toLowerCase();
      yearAttendance[term] = {
        count: thisYearsMeeting.enrollments.length,
        meeting_id: thisYearsMeeting.id,
      };
      course.attendance.push("", yearAttendance.spring, yearAttendance.summer, yearAttendance.fall);
    });
  };

  var _fetchCourses = function() {
    return Restangular.all('courses').getList()
      .then(function(courses) {
        angular.copy(courses, _courses);
        return _courses;
      });
  };

  return {
    getCourses: getCourses,
    create: create,
    update: update,
    setCourses: setCourses,
    countOfForeignCourses: countOfForeignCourses
  };

}]);
