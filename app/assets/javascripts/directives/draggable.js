planner.directive('draggable', function() {


  return function(scope, element, attrs) {   

    var el = element[0];

    el.draggable = true;

    var doTheDragStartThings = function(e, attrs, that) {



      // If the course being dragged has been scheduled, get the year

      var thisYearId;

      if (e.target.getAttribute('data-year-id')) {
        thisYearId = e.target.getAttribute('data-year-id');
      }



      // Get the possible terms from the course being dragged

      var thisTermsJSON = e.target.getAttribute('terms')
      var thisTerms = JSON.parse(thisTermsJSON);
      var thisTermsIds = [];

      for (var i = 0; i < thisTerms.length; i++) {
        thisTermsIds.push(thisTerms[i].id);
      }



      // Allow the course to be dragged

      var previousTerm;

      if (that.parentNode.getAttribute('data-term-id')) {
        previousTerm = that.parentNode.getAttribute('data-term-id');
      }


      
      e.dataTransfer.effectAllowed = 'move';
      var data = JSON.stringify({id: that.id, prevTerm: previousTerm, prevYear: thisYearId});
      e.dataTransfer.setData('Text', data);



      // Highlight available 'drop' buckets
      // And dull out unavailable 'drop' buckets

      that.classList.add('drag');

      angular.element('.term')
          .addClass('unpermitted');

      if (!that.parentNode.classList.contains('course-bubble-container')) {
        angular.element('.course-bubble-container')
          .addClass('permitted');
      }

      if (thisTermsJSON == "") {
        angular.element(".term")
          .removeClass('unpermitted')
          .addClass('permitted');            
      } else {

        if (thisTermsIds.length == 1 && thisTerms[0].name == 'Any' ) {
          angular.element(".term")
            .removeClass('unpermitted')
            .addClass('permitted');          
        } else {

          for (var i = 0; i < thisTermsIds.length; i++) {
            angular.element(".term[data-term-id='" + thisTermsIds[i] + "']")
              .removeClass('unpermitted')
              .addClass('permitted');
          }
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
        // this.classList.remove('drag');
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