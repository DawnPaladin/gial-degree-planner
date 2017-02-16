planner.directive('draggable', function() {


  return function(scope, element, attrs) {   

    var el = element[0];

    debugger;

    var attrs = attrs;

    el.draggable = true;

    el.addEventListener(
      'dragstart',
      function(e) {
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




        return false;
      },
      false
    );

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