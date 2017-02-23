planner.filter('unscheduledFilter', ['planService', function(planService) {

  return function(courses) {

    var planInfo = planService.getPlanInfo();

    var scheduledClasses = angular.copy(planInfo.plan.scheduled_classes, []);
    // if (planInfo.plan.elective_courses.length) {
    //   var electives = planInfo.plan.elective_courses;
    // }

    var filtered = [];

    for (var i = 0; i < courses.length; i++) {
      var isScheduled = false;
      for (var j = scheduledClasses.length - 1; j >= 0; j--) {
        if (scheduledClasses[j].course_id == courses[i].id) {
          isScheduled = true;
          scheduledClasses.splice(j, 1);
        }
      }
      if (!isScheduled) {
        filtered.push(courses[i]);
      }
    }

    return filtered;

  };

}]);