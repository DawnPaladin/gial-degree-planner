planner.directive('draggable', function() {


  return function(scope, element, attrs) {   

    var el = element[0];

    el.draggable = true;

    var doTheDragStartThings = function(e, attrs, that) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('Text', that.id);
      that.classList.add('drag');

      // Get the term id off of the element being dragged

      angular.element('.term')
          .addClass('unpermitted');

      if (!that.parentNode.classList.contains('course-bubble-container')) {
        angular.element('.course-bubble-container')
          .addClass('permitted');
      }

      var thisTermJSON = e.target.getAttribute('term');

      if (thisTermJSON == "") {
        angular.element(".term")
          .removeClass('unpermitted')
          .addClass('permitted');            
      } else {

        var thisTerm = JSON.parse(thisTermJSON);
        var thisTermId = thisTerm.id;

        if (thisTerm.name == 'Any' ) {
          angular.element(".term")
            .removeClass('unpermitted')
            .addClass('permitted');          
        } else {
          angular.element(".term[data-term-id='" + thisTermId + "']")
            .removeClass('unpermitted')
            .addClass('permitted');
        }
      }

      return false;
    };

    el.addEventListener('dragstart', function(e) {
      doTheDragStartThings(e, attrs, this);
    }, false);


    el.addEventListener(
      'dragend',
      function(e) {
        this.classList.remove('drag');
        angular.element('.course-bubble-container')
          .removeClass('permitted');
        angular.element(".term")
          .removeClass('unpermitted')
          .removeClass('permitted');
        return false;
      },
      false
    );

  }

});