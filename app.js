var express = require('express');
var app = express();

app.use(express.basicAuth(function(user, pass, callback) {
  var result = (user === 'testUser' && pass === 'testPass');
  callback(null, result);
}));

app.use(express.static(__dirname + '/www'));

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.get('/secret', function(req, res) {
    res.send({message : 'helo world'});
});

console.log("Starting server on 8080");
app.listen(process.env.PORT || 8080);