planner.filter('unscheduledFilter', ['planService', function(planService) {

  return function(courses) {

    var planInfo = planService.getPlanInfo();

    var scheduledClasses = planInfo.plan.scheduled_classes;

    var filtered = [];

    for (var i = 0; i < courses.length; i++) {
      var isScheduled = false;
      for (var j = 0; j < scheduledClasses.length; j++) {
        if (scheduledClasses[j].course_id == courses[i].id) {
          isScheduled = true;
        }
      }
      if (!isScheduled) {
        filtered.push(courses[i]);
      }
    }

    return filtered;

  };

}]);