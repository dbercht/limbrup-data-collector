angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('TypesService' , function($resource) {
  return $resource("/types"); 
})
.factory('WorkoutsService' , function($resource) {
  return $resource("/workouts/:workoutId"); 
})
.factory('WorkoutResultsService' , function($resource) {
  return $resource("/workouts/:workoutId/results", { workoutId : '@workoutId'} );
});
