// Init express and fs
var express = require('express');
var app = express();
var fs = require('fs');

app.set("view engine", "ejs");

// Listen to port
app.listen(3000, function(){
    console.log("Listening on port 3000");
    setInterval(function(){
        console.log("Server Status: stable");
    }, 60000);
});

// Root query
app.get('/', function(req, res){
    if(req.ip === "::ffff:127.0.0.1") {
        try {
            var json = JSON.parse(fs.readFileSync('./matthew' + '.json', 'utf8'));
            res.render('profile', {person: "matthew", data: json});
            console.log("ADMIN LOGGED IN AUTOMATICALLY");
        } catch(err) {
            res.render('main');
        }
    } else {
        res.render('main');
    }
});

// Profile query
app.get('/home/:data', function(req, res){
    console.log(req.ip + " Is trying to access " + __dirname + "/" + req.params.data);

    // Catch errors
    try {
        // Parse JSON file
        var json = JSON.parse(fs.readFileSync('./' + req.params.data + '.json', 'utf8'));
        // Respond with JSON edited HTML
        res.render('profile', {person: req.params.data, data: json});
        console.log(req.ip + " accessed " + __dirname + "/" + req.params.data);
    } catch (err) {
        res.render('404');
        console.log(req.ip + " failed to access " + __dirname + "/" + req.params.data);
    }
});

// Profile contact query
app.get('/home/:data/contact', function(req, res){
    console.log(req.ip + " Is trying to access " + __dirname + "/" + req.params.data + "/contact");

    // Catch errors
    try {
        // Parse JSON file
        var json = JSON.parse(fs.readFileSync('./' + req.params.data + '.json', 'utf8'));
        // Respond with JSON edited HTML
        res.render('contact', {person: req.params.data, data: json});
        console.log(req.ip + " accessed " + __dirname + "/" + req.params.data + "/contact");
    } catch (err) {
        res.render('404');
        console.log(req.ip + " failed to access " + __dirname + "/" + req.params.data + "/contact");
    }
});

// API query
app.get('/api/:data', function(req, res){
    console.log(req.ip + " Is trying to access " + __dirname + "/" + req.params.data)

    // Catch errors
    try {
        // CHECK FOR JSON
        var json = fs.readFileSync('./' + req.params.data + '.json', 'utf8');
        // Send API
        res.sendFile(__dirname + "/" + req.params.data + ".json");
        console.log(req.ip + " accessed " + __dirname + "/" + req.params.data);
    } catch(err) {
        res.render('404');
        console.log(req.ip + " failed to access " + __dirname + "/" + req.params.data);
    }
});
