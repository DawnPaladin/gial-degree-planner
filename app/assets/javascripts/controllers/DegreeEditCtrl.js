planner.controller('DegreeEditCtrl', ['$scope', 'degree',
  function($scope, degree) {
    $scope.degree = degree;
    console.log(degree);
    $scope.currentConcentration = {
      name: "",
      categories: [
        {
          name: "Test category",
          required_units: 3
        }
      ],
    };

    function Concentration() {
      this.name = "";
      this.degree_id = degree.id;
    }
    $scope.newConcentration = new Concentration();

    $scope.saveDegree = function() {
      degree.put();
    };

    $scope.editConcentration = function(current) {
      $scope.currentConcentration = current;
    };

    $scope.createConcentration = function() {
      $scope.degree.concentrations.push($scope.newConcentration);
      $scope.addConcentrationVisible = false;
      $scope.newConcentration = new Concentration();
    };

    $scope.deleteConcentration = function(concentration) {
      if (confirm("Are you sure you wish to remove the " + concentration.name + " concentration?")) {
        var index = $scope.degree.concentrations.indexOf(concentration);
        $scope.degree.concentrations.splice(index, 1);
      }
    };
  }
]);
