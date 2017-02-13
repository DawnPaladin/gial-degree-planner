planner.factory('planService', ['Restangular', function(Restangular) {

  var update = function(plan) {
    return Restangular.one('plans').customPUT(plan, plan.id).then(function(plan) {
      return plan;
    }, function(response) {
      console.log(response);
    });
  }

  return {
    update: update
  };

}]);