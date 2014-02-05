angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('StartCtrl', function($scope, $cookieStore, WorkoutsService, $location) {
  if ($cookieStore.get('intro') !== true) {
   $location.path('/tab/intro'); 
  }
  $scope.workouts = WorkoutsService.query(function(){
    $scope.stats.workouts = $scope.workouts.length;
    $scope.stats.results = 0;
    for (var i = 0; i < $scope.workouts.length; i++) {
      $scope.stats.results += parseInt($scope.workouts[i].results);
    }
  });
  $scope.hasDone = function(workoutId) {
    return $cookieStore.get(workoutId) !== undefined; 
  };
  $scope.stats = {};
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
.controller('WorkoutResultsCtrl', function($scope, $stateParams, $cookieStore, WorkoutResultsService, $ionicModal) {
  $scope.results = WorkoutResultsService.query({ workoutId : $stateParams.id});
  $scope.hasDone = function(resultId) {
    var results = $cookieStore.get($stateParams.id);
    if (results === undefined) {
      return false;
    }
    return results[resultId] === true;
  };
  $ionicModal.fromTemplateUrl('templates/result.html', function(modal) {
    $scope.modal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.openModal = function(result) {
    $scope.viewResult = result;
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
})

// A simple controller that fetches a list of data from a service
.controller('WorkoutCtrl', function($scope, $cookieStore, $stateParams, WorkoutsService, WorkoutResultsService) {
  $scope.workout = WorkoutsService.get({ workoutId : $stateParams.id}, function(){});
  $scope.change = function() { $scope.formValid = ($scope.result.value.length > 0); };
  $scope.submit = function() { 
    $scope.loading = true;
    var result = new WorkoutResultsService({ workoutId : $stateParams.id, result : $scope.result.value});
    result.$save( function(result) {
      $scope.loading = false;
      $scope.submitted = true;
      var hasDone = $cookieStore.get($stateParams.id);
      if (hasDone === undefined) {
        hasDone = {};
      }
      hasDone[result.id] = true;
      $cookieStore.put($stateParams.id, hasDone);
    });
  };

  $scope.result = { value : "" };
  $scope.formValid = false;
  $scope.submitted = false;
});
