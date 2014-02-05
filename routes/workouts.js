var utils = require('../utils.js');

exports.all = function(req, res) {
  utils.query (res,
      { 
        name : "all_workouts", 
    text: "SELECT workouts.id, workouts.description, types.name as type, count(workout_results.id) as results FROM workouts INNER JOIN types ON workouts.type_slug = types.slug LEFT OUTER JOIN workout_results ON workouts.id = workout_results.workout_id GROUP BY workouts.id, workouts.description, types.name ORDER BY workouts.id DESC", 
    values : []
      }, 
      function(result) {
        res.send(result.rows);
      });
};

exports.get = function(req, res) {
  utils.query(res,
      { 
        name : "get_workout", 
    text: "SELECT workouts.id, workouts.description, types.name as type, count(workout_results.id) as results FROM workouts INNER JOIN types ON workouts.type_slug = types.slug LEFT OUTER JOIN workout_results ON workouts.id = workout_results.workout_id WHERE workouts.id = $1 GROUP BY workouts.id, workouts.description, types.name", 
    values : [req.params.id]
      },
      function(result) {
        if (result.rows.length === 0) {
          res.send(404);
        } else {
          res.send(result.rows[0]);
        }
      });
};

exports.create = function(req, res) {
  utils.query(res,
      { 
    name : "create_workout", 
    text: 'INSERT INTO workouts (description, type_slug) VALUES ($1, $2) RETURNING id',
    values : [req.body.description, req.body.type_slug] 
  },
  function(result) {
    res.send(result.rows[0]);
  });
};

exports.getResults = function(req, res) {
  utils.query(res,
      { 
    name : "get_results", 
    text: 'SELECT workout_results.result FROM workout_results WHERE workout_results.workout_id = $1',
    values : [req.params.id]
  },
  function(result) {
    res.send(result.rows);
  });
};

exports.createResult = function(req, res) {
  utils.query(res,
      { 
    name : "create_result", 
    text: 'INSERT INTO workout_results (workout_id, result) VALUES ($1, $2) RETURNING id',
    values : [req.params.id, req.body.result]
  },
  function(result) {
    res.send(result.rows[0]);
  });
};
