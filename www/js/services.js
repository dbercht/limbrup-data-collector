angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('PetService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var pets = [
    { id: 0, title: 'Cats', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
    { id: 1, title: 'Dogs', description: 'Lovable. Loyal almost to a fault. Smarter than they let on.' },
    { id: 2, title: 'Turtles', description: 'Everyone likes turtles.' },
    { id: 3, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' }
  ];

  return {
    all: function() {
      return pets;
    },
    get: function(petId) {
      // Simple index lookup
      return pets[petId];
    }
  }
})
.factory('TypeService' , function($resource) {
  var types = [
    { name : "As Many Rounds As Possible",
      description : "Accomplish as many rounds/repetitions as possible in a given timeframe",
      alias : ["AMRAP", "as many reps as possible"],
      slug : "amrap"
    },
    {
      name : "Rounds for time",
      description : "Complete x rounds of a circuit for time",
      alias : ['xRFT', 'AFAP'],
      slug : "xrft"
    },
    {
      name : "Set",
      description : "Accomplish x sets of a set of movement/repetitions",
      alias : [],
      slug : "set"
    },
    {
      name : 'x Rep Max',
      description : 'Do x repetitions of a movement of the max weight',
      alias : ['xRM'],
      slug : "xrm"
    },
    {
      name : 'Rep Scheme',
      description : "21-15-9, 10-9-8-7-..., varying reps of a given circuit",
      alias : ["x-y-z"],
      slug : "x-y-z"
    },
    {
      name : "Tabata",
      description : "20 sec work, 10 sec rest, 8 times",
      alias : [],
      slug : "tabata"  
    },
    {
      name : "Every Minute on the Minute",
      description : "Every minute on the minute, do something. Can vary odd/even",
      alias : ['emotm', 'emom'],
      slug : "tabata"
    }
  ];
  return {
    query: function() {
      return { code : 200, data : types };
    },
    get: function(slug) {
      // Simple index lookup
      for (var i = 0; i < types.length; i++) {
        if (slug === types[i].slug) {
          return types[i];
        }
      }
      return {};
    }
  }
})
;
