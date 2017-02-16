// planner.factory('helpers', [function() {

//   var extendArray = function(array, propName, value) {
//     array.forEach(function(element) {
//       element[propName] = value;
//     });
//   };

//   var zipArrays = function(additive, addedTo, checkAgainst) {
//     var included;
//     for (var i = 0; i < additive.length; i++) {
//       for (var j = 0; j < addedTo.length; j++) {
//         if (additive[i].id === addedTo[j].id) {
//           console.log('required', additive[i])
//           console.log('intended', addedTo[j])
//           included = true;
//         } else {

//           for (var k = 0; k < checkAgainst.length; k++) {
//             if (additive[i].id === checkAgainst[k].id) {
//               console.log('required', additive[i])
//               console.log('completed', checkAgainst[k])
//               included = true;
//             }
//           }
//         }
//       }
//       if (!included) addedTo.push(additive[i]);
//     }
//     return addedTo;
//   };

//   return {
//     extendArray: extendArray,
//     zipArrays: zipArrays
//   };

// }]);