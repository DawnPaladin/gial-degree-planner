planner.filter('summaryCourseFilter', ['planService', function(planService) {

  return function(course) {

    var planInfo = planService.getPlanInfo();
    var intendedCourses = planInfo.plan.intended_courses;
    var isIntended = false;

    for (var i = 0; i < intendedCourses.length; i++) {
      if (intendedCourses[i].id == course.id) {
        isIntended = true;
        break;
      }
    }

    if (isIntended) {
      return "✓";
    } else {
      return "";
    }

  }

}]);