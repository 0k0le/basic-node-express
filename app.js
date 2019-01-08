// Init express
var express = require('express');
var app = express();
var fs = require('fs');

app.set("view engine", "ejs");

// Listen to port
app.listen(3000, function(){
    console.log("Listening on port 3000");
});

app.get('/', function(req, res){
    res.render('main');
});

app.get('/home/:data', function(req, res){
    console.log(req.ip + " Is trying to access " + __dirname + "/" + req.params.data);

    try {
        var json = JSON.parse(fs.readFileSync('./' + req.params.data + '.json', 'utf8'));
        res.render('profile', {person: req.params.data, data: json});
        console.log(req.ip + " accessed " + __dirname + "/" + req.params.data);
    } catch (err) {
        res.render('404');
        console.log(req.ip + " failed to access " + __dirname + "/" + req.params.data);
    }
});

app.get('/api/:data', function(req, res){
    console.log(req.ip + " Is trying to access " + __dirname + "/" + req.params.data)

    try {
        var json = JSON.parse(fs.readFileSync('./' + req.params.data + '.json', 'utf8'));
        res.sendFile(__dirname + "/" + req.params.data + ".json");
        console.log(req.ip + " accessed " + __dirname + "/" + req.params.data);
    } catch(err) {
        res.render('404');
        console.log(req.ip + " failed to access " + __dirname + "/" + req.params.data);
    }
});
