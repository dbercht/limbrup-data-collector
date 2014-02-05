var express = require('express');
var app = express();
var workoutTypes = require('./routes/types.js');
var workouts = require('./routes/workouts.js');
var user = process.env.USER || "testUser";
var pass = process.env.PW || "testPass";


app.use(express.bodyParser());
app.use(express.basicAuth(function(user, pass, callback) {
  var result = (user === user && pass === pass);
  callback(null, result);
}));

app.use(express.static(__dirname + '/www'));

app.get('/', function(req, res) {});

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