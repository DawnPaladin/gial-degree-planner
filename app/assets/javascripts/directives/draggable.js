planner.directive('draggable', function() {


  return function(scope, element, attrs) {   

    var el = element[0];

    el.draggable = true;

    var dotheDragStartThings = function(e, attrs) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('Text', this.id);
      this.classList.add('drag');

      debugger;

      // iterate over all of the session bins
      // if a session bin's term and session ids
      // match the term id and any session id on this thing being dragged
        // add the green highlight class to them
      // otherwise
        // add a dull 'disabled' class

      var terms = JSON.parse(attrs.terms);

      for(var i = 0; i < terms.length; i++) {
        for (var j = 0; j < terms[i].sessions.length; j++) {

          var termId = terms[i].id;
          var sessionId = terms[i].sessions[j].id;

        }
      }

      return false;
    };

    el.addEventListener('dragstart', function(e) {
      dotheDragStartThings(e, attrs);
    }, false);


    el.addEventListener(
      'dragend',
      function(e) {
        this.classList.remove('drag');
        return false;
      },
      false
    );

  }

});