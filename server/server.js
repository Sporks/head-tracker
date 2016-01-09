var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var path = require('path');
var processData = require('./utils/processData');
var fs = require('fs');

//Created my own private key and CA
//Use your own here
var privateKey = fs.readFileSync('sslcert/rootCA.key', 'utf8');
var certificate = fs.readFileSync('sslcert/rootCA.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var https = require('https').Server(credentials, app);
// Create a secure version of sockets
var ios = require('socket.io')(https);

//set up static route and make it NOT route to index automatically, allowing for middleware
app.use(express.static(path.join(__dirname, './../client'), {index: false}));
app.use(bodyParser.urlencoded({ extended: false }));
//Make sure only one user can connect at a time.
var connected = false;
// app.post('/data', processData.print)

app.get('/', function(req, res){
    if(connected){
        res.sendFile(path.resolve(__dirname+'./../client/wait.html'));
    }
    res.sendFile(path.resolve(__dirname+'./../client/index.html'));
});

ios.on('connection', function(socket){
    connected = true;
    console.log("User Connected");
    socket.on('position', function(pos){
        // console.log("User at : ", pos);
        processData.moveServo(pos);
    });
    socket.on('disconnect', function(){
        connected = false;
        console.log("disconnected");
    });
});

//insecure connection (for testing)
io.on('connection', function(socket){
    connected = true;
    console.log("User Connected");
    socket.on('position', function(pos){
        processData.moveServo(pos);
    });
    socket.on('disconnect', function(){
        connected = false;
        console.log("disconnected");
    });
});

//why am i using this as middleware for native http?
http.listen(3000, function(){
    console.log("Listening on port 3000")
});
https.listen(4000, function(){
    console.log("Listening on port 4000");
})

module.exports = app;
