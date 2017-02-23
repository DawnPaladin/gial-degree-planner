planner.factory('concentrationService', ['Restangular', 'Flash', function(Restangular, Flash) {
  var exports = {};

  exports.setup = function(aDegree) {
    exports.degree = aDegree;
  };

  exports.loadConcentration = function(concentration) {
    Restangular.restangularizeElement(null, concentration, 'concentrations');
    exports.current = concentration;
    concentration.has_thesis_track = !!concentration.thesis_track;
    console.log(concentration);
  };

  exports.save = function() {
    exports.current.categories_attributes = exports.current.categories.map(function(category) {
      return {
        id: category.id,
        name: category.name,
        course_ids: category.courses.map(function(course) { return course.id; }),
        required_units: category.required_units,
      };
    });
    exports.current.put().then(function() {
      Flash.create("success", "Concentration saved");
      exports.current = null;
    }, function(response) {
      console.warn(response);
      Flash.create("danger", "Concentration could not be saved. See console for details.");
    });
  };

  exports.createCategory = function() {
    console.log(exports.current.categories);
    exports.current.categories.unshift({
      concentration_id: exports.current.id,
      courses: [],
      name: "New category",
      required_units: 0
    });
  };

  function Concentration(degree, name) {
    this.name = name;
    this.degree_id = degree.id;
    this.categories = [];
  }

  exports.createConcentration = function(degree, name) {
    var obj = new Concentration(degree, name);
    Restangular.restangularizeElement(null, obj, 'concentrations');
    return obj.post().then(function(newConcentration) {
      Flash.create("success", "Concentration created");
      exports.loadConcentration(newConcentration);
      return newConcentration;
    }, function(response) {
      console.warn(response);
      Flash.create("danger", "Concentration could not be created. See console for details.");
    });
  };

  return exports;
}]);
