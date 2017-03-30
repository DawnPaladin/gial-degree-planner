planner.filter('termFilter', function() {

  return function(terms) {


    if (terms == undefined || terms.length == 0) {
      return '';
    }

    var result = "";

    if (terms.length == 1) {
      return terms[0].name;
    }

    for (var i = 0; i < terms.length; i++) {
      if (i !== 0) result += ' / ';
      result += terms[i].name;
    }

    return result;

  };

});
