planner.directive('draggable', function() {


  return function(scope, element, attrs) {   

    var el = element[0];

    el.draggable = true;

    var doTheDragStartThings = function(e, attrs, that) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('Text', that.id);
      that.classList.add('drag');

      // Get the term id and session ids off of the element being dragged

      var thisTermId = JSON.parse(e.target.getAttribute('term')).id;
      var thisSessionIds = [];
      var thisSessions = JSON.parse(e.target.getAttribute('sessions'));

      for (var i = 0; i < thisSessions.length; i++) {
        thisSessionIds.push(thisSessions[i].id);
      }

      // iterate over all of the session bins
      // if a session bin's term and session ids
      // match the term id and any session id on this thing being dragged
        // add the green highlight class to it
      // otherwise
        // add a dull 'disabled' class

        angular.element('.session')
          .addClass('unpermitted');

        var thisSessionId = thisSessionIds[0].id;
          angular.element(".session[data-term-id='" + thisTermId + "'][data-session-id='" + thisSessionIds[0] + "']")
          .removeClass('unpermitted')
          .addClass('permitted');



      return false;
    };

    el.addEventListener('dragstart', function(e) {
      doTheDragStartThings(e, attrs, this);
    }, false);


    el.addEventListener(
      'dragend',
      function(e) {
        this.classList.remove('drag');
        angular.element(".session")
          .removeClass('unpermitted')
          .removeClass('permitted');
        return false;
      },
      false
    );

  }

});