planner.filter('summaryCourseFilter', ['planService', function(planService) {

  return function(course) {

    var planInfo = planService.getPlanInfo();
    var scheduledClasses = planInfo.plan.scheduled_classes;
    var scheduledClass;

    for (var i = 0; i < scheduledClasses.length; i++) {
      if (scheduledClasses[i].course_id == course.id) {
        scheduledClass = scheduledClasses[i];
        break;
      }
    }

    if (scheduledClass) {
      return scheduledClass.term + " " + scheduledClass.year;
    } else {
      return "";
    }

  }

}]);