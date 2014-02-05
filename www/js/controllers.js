angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('StartCtrl', function($scope, $cookieStore, WorkoutsService, $location) {
  if ($cookieStore.get('intro') !== true) {
   $location.path('/tab/intro'); 
  }
  $scope.workouts = WorkoutsService.query(function(){
  });
  $scope.hasDone = function(workoutId) {
    return $cookieStore.get(workoutId) === true
  };
})
.controller('IntroCtrl', function($cookieStore) {
  $cookieStore.put('intro', true);
})
// A simple controller that fetches a list of data from a service
.controller('NewWorkoutCtrl', function($scope, WorkoutsService, TypesService) {
  $scope.submitWorkout = function() {
    var workout = new WorkoutsService( $scope.workout );
    workout.$save(function() {
      $scope.created = true;
      $scope.workout = { description : "", type_slug : "" };
    });
  };
  $scope.submitType = function() {
    var type = new TypesService( $scope.type );
    type.$save(function() {
      $scope.created = true;
      $scope.types.push($scope.type);
      $scope.type = { description : "", slug : "", name : "" };
    });
  };
  $scope.types = TypesService.query();
  $scope.workout = { description : "", type_slug : "" };
  $scope.type = { slug : "", name : "", description : "" };
  $scope.created = false;
})

// A simple controller that fetches a list of data from a service
.controller('WorkoutCtrl', function($scope, $cookieStore, $stateParams, WorkoutsService, WorkoutResultsService) {
  $scope.title = "How would you log...";
  $scope.workout = WorkoutsService.get({ workoutId : $stateParams.id}, function(){
  });
  $scope.change = function() { $scope.formValid = ($scope.result.value.length > 0) }
  $scope.submit = function() { 
    $scope.loading = true;
    var result = new WorkoutResultsService({ workoutId : $stateParams.id, result : $scope.result.value});
    result.$save( function() {
      $scope.loading = false;
      $scope.submitted = true;
      $cookieStore.put($stateParams.id, true);
    });
  };
  $scope.result = { value : "" };
  $scope.formValid = false;
  $scope.submitted = false;
})
