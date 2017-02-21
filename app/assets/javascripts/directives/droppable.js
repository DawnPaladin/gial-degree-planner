planner.directive('droppable', ['planService', function(planService) {

  return {
    scope: {
      drop: '&',
      bin: '='
    },
    link: function(scope, element, attrs) {


      var el = element[0];

      var dropEventHandler = function(e, attrs, that) {
          if (e.stopPropagation) e.stopPropagation();

          // if this bubble is the 'sticky-bubble-container'
            // allow the function to continue normally

          // if either the term id or the session id on this session
          // do not match the term id and any of the session ids on the bubble being dragged
            // do not allow the drop to execute

          var item = document.getElementById(e.dataTransfer.getData('Text'));
          var termId = JSON.parse(item.getAttribute('term')).id;
          var sessionId = JSON.parse(item.getAttribute('sessions'))[0].id;

          that.classList.remove('over');

          if (item.parentNode.id == 'sticky-container' && that.id == 'sticky-container') {
            return false;
          } else if (that.id == 'sticky-container') {

          } else if (termId != that.getAttribute('data-term-id') || sessionId != that.getAttribute('data-session-id')) {
            return false;
          }



          if (that.id == "sticky-container") {
            console.log('item', item);
            var year = item.getAttribute('data-year-id');
            var term = JSON.parse(item.getAttribute('term')).id;
            var session = JSON.parse(item.getAttribute('sessions'))[0].id;

            var meetingData = {
              id: that.id,
              meeting_year: year,
              meeting_term: term,
              meeting_session: session          
            };
          } else {
            var meetingData = {
              id: that.id,
              meeting_year: that.getAttribute('data-year-id'),
              meeting_term: that.getAttribute('data-term-id'),
              meeting_session: that.getAttribute('data-session-id')
            };
            that.appendChild(item);
          }

          var itemHeight = angular.element(item).css('height');
          var space = "<div style='height: " + itemHeight + "; width: 100%;'></div>";
          angular.element(item).parent().next().prepend(space);

          scope.$apply(function(scope) {
            var fn = scope.drop();
            if ('undefined' !== typeof fn) {
              fn(item.id, meetingData);
            }
          });
          return false;
      };


      el.addEventListener(
        'dragover',
        function(e) {
          e.dataTransfer.dropEffect = 'move';
          if (e.preventDefault) e.preventDefault();
          this.classList.add('over');
          return false;
        },
        false
      );


      el.addEventListener(
        'dragenter',
        function(e) {
          this.classList.add('over');
          return false;
        },
        false
      );


      el.addEventListener(
        'dragleave',
        function(e) {
          this.classList.remove('over');
          return false;
        },
        false
      );


      el.addEventListener('drop', function(e) {
        dropEventHandler(e, attrs, this);
      }, false );

    }
  }

}]);