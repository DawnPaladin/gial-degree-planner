planner.directive('ipsScheduleTerm', function() {
	return {
		templateUrl: "/directives/ips-schedule-term.html",
		restrict: "E",
		scope: {
			year: '=',
			term: '=',
		},
	}
});
