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

          if (that.id == 'sticky-container') {

          } else if (termId != that.getAttribute('data-term-id') || sessionId != that.getAttribute('data-session-id')) {
            return false;
          }

          var meetingData = {
            id: that.id,
            meetingYear: that.getAttribute('data-year'),
            meetingTerm: that.getAttribute('data-term-id'),
            meetingSession: that.getAttribute('data-session-id')
          };


          that.appendChild(item);
          
          if (angular.element(that).hasClass('session')) {
            angular.element(item).addClass('placed');
          } else {
            angular.element(item).removeClass('placed');
          }

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