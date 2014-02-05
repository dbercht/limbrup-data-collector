var express = require('express');
var app = express();
var workoutTypes = require('./routes/types.js');
var workouts = require('./routes/workouts.js');

app.use(express.bodyParser());
app.use(express.basicAuth(function(user, pass, callback) {
  var result = (user === 'testUser' && pass === 'testPass');
  callback(null, result);
}));

app.use(express.static(__dirname + '/www'));

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.get('/types', workoutTypes.all);
app.post('/types', workoutTypes.create);
app.get('/types/:slug', workoutTypes.get);
app.post('/types/:slug/alias', workoutTypes.createAlias);

app.get('/workouts', workouts.all);
app.post('/workouts', workouts.create);
app.get('/workouts/:id', workouts.get);
app.get('/workouts/:id/results', workouts.getResults);
app.post('/workouts/:id/results', workouts.createResult);



console.log("Starting server on 8080");
app.listen(process.env.PORT || 8080);