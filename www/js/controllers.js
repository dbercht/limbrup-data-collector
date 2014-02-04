angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, $resource, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pets = PetService.all();
  $resource('/secret').get({}, function(response) {
    console.log(response);
  });
})


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
});
