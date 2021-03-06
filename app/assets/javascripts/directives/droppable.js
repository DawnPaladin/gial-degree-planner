planner.directive('droppable', function() {

  return {
    scope: {
      drop: '&'
    },
    link: function(scope, element, attrs) {

      var el = element[0];

      var droppingInSameLocation = function(item, that) {

        var yearSame = item.parentNode.getAttribute('data-year-id') == that.getAttribute('data-year-id');
        var termSame = item.parentNode.getAttribute('data-term-id') == that.getAttribute('data-term-id');

        if (yearSame && termSame) {
          return true;
        }
        return false;
      };

      var dropEventHandler = function(e, attrs, that) {
          if (e.stopPropagation) e.stopPropagation();
          e.preventDefault();

          // if this bubble is the 'sticky-bubble-container'
            // allow the function to continue normally

          // if the term id on this session
          // does not match the term id on the bubble being dragged
          // do not allow the drop to execute
          that.classList.remove('over');

          var item = angular.element('.drag')[0];
          item.classList.remove('drag');


          var termsJSON = item.getAttribute('terms');
          var terms = JSON.parse(termsJSON);
          var termsIds = [];
          for (var i = 0; i < terms.length; i++) {
            termsIds.push(terms[i].id);
          }
          var termId;



          if (termsJSON == "" || terms[0].name == "Any") {
            if (that.id == "sticky-container") {
              // gets sticky container termId
              termId = item.parentNode.getAttribute('data-term-id');
            } else {
              // gets parent bubble's termId
              termId = that.getAttribute('data-term-id');
            }
          } else {
            termId = item.parentNode.getAttribute('data-term-id');      
          }


          if (item.parentNode.id == 'sticky-container' && that.id == 'sticky-container') {
            return false;
          } else if (droppingInSameLocation(item, that)){
            return false;
          } else if (that.id == 'sticky-container') {

          } else if (terms[0].name == "Any") {

          } else if (!termsIds.includes(parseInt(that.getAttribute('data-term-id')))) {
            return false;
          }

          if (that.id == "sticky-container") {

            var year = item.getAttribute('data-year-id');



            var meetingData = {
              id: that.id,
              meeting_year: year,
              meeting_term: termId,
              prevTerm: JSON.parse(e.dataTransfer.getData('Text')).prevTerm,
              prevYear: JSON.parse(e.dataTransfer.getData('Text')).prevYear
            };


          } else {

            meetingData = {
              id: that.id,
              meeting_year: that.getAttribute('data-year-id'),
              meeting_term: that.getAttribute('data-term-id'),
              prevTerm: JSON.parse(e.dataTransfer.getData('Text')).prevTerm,
              prevYear: JSON.parse(e.dataTransfer.getData('Text')).prevYear
            };

            that.appendChild(item);

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
  };

});