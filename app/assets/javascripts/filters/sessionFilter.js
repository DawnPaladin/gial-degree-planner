planner.filter('sessionFilter', function() {

  return function(sessions) {


    if (sessions == undefined || sessions.length == 0) {
      return '';
    }

    if (sessions.length === 1) {
      return "Session " + sessions[0].name;
    } else {
      var min, max;
      for (var i = 0; i < sessions.length; i++) {
        var num = parseInt(sessions[i].name.slice(-1));
        if (min == undefined || num < min ) {
          min = num;
        }
        if (max == undefined || num > max) {
          max = num;
        }
      }

      return "Sessions " + min + "-" + max;
    }

  };

});
